# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import joblib
# from scraper.scraper import fetch_news
# from datetime import datetime
# import random

# # Load model
# model = joblib.load("model/news_model.joblib")

# # FastAPI app
# app = FastAPI()

# # Allow CORS for local frontend testing
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Request model for classification
# class ArticleInput(BaseModel):
#     title: str
#     content: str

# # Response model
# class ClassificationResult(BaseModel):
#     category: str

# @app.post("/classify", response_model=ClassificationResult)
# def classify_article(article: ArticleInput):
#     text = f"{article.title} {article.content}"
#     prediction = model.predict([text])[0]
#     return {"category": prediction}


# @app.get("/news-classified")
# def get_classified_news():
#     raw_articles = fetch_news()
#     classified_articles = []

#     for article in raw_articles:
#         title = article.get("title", "")
#         summary = article.get("summary", "")
#         link = article.get("link", "#")
#         published = article.get("published", datetime.now().strftime("%a, %d %b %Y %H:%M:%S %z"))
#         source = article.get("source", "unknown")

#         text = f"{title} {summary}"
#         try:
#             prediction = model.predict([text])[0]
#         except:
#             prediction = "general"

#         classified_articles.append({
#             "title": title,
#             "excerpt": summary,
#             "content": summary,  # You can replace this with full article content if available
#             "category": prediction,
#             "author": source,
#             "imageUrl": "https://source.unsplash.com/random/800x600",  # Random placeholder image
#             "publishDate": published,
#             "readTime": f"{random.randint(3, 8)} min read",
#             "likes": random.randint(100, 1000),
#             "isFeatured": random.choice([True, False]),
#             "isTrending": random.choice([True, False])
#         })

#     return classified_articles

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
from scraper.scraper import fetch_news
from datetime import datetime
import random
from apscheduler.schedulers.background import BackgroundScheduler

# Load model
model = joblib.load("model/news_model.joblib")

# FastAPI app
app = FastAPI()

# Allow CORS for local frontend testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for classification
class ArticleInput(BaseModel):
    title: str
    content: str

# Response model
class ClassificationResult(BaseModel):
    category: str

# In-memory cache for auto-scheduled classification results
classified_news_cache = []

@app.post("/classify", response_model=ClassificationResult)
def classify_article(article: ArticleInput):
    text = f"{article.title} {article.content}"
    prediction = model.predict([text])[0]
    return {"category": prediction}


@app.get("/news-classified")
def get_classified_news():
    raw_articles = fetch_news()
    classified_articles = []

    for article in raw_articles:
        title = article.get("title", "")
        summary = article.get("summary", "")
        link = article.get("link", "#")
        published = article.get("published", datetime.now().strftime("%a, %d %b %Y %H:%M:%S %z"))
        source = article.get("source", "unknown")

        text = f"{title} {summary}"
        try:
            prediction = model.predict([text])[0]
        except:
            prediction = "general"

        classified_articles.append({
            "title": title,
            "excerpt": summary,
            "content": summary,
            "category": prediction,
            "author": source,
            "imageUrl": "https://source.unsplash.com/random/800x600",
            "publishDate": published,
            "readTime": f"{random.randint(3, 8)} min read",
            "likes": random.randint(100, 1000),
            "isFeatured": random.choice([True, False]),
            "isTrending": random.choice([True, False])
        })

    return classified_articles


# 🔁 Background job function
def scheduled_classify_news():
    print("[Scheduler] Running scheduled news fetch & classify")
    try:
        articles = fetch_news()
        updated = []
        for article in articles:
            title = article.get("title", "")
            summary = article.get("summary", "")
            text = f"{title} {summary}"
            try:
                prediction = model.predict([text])[0]
            except:
                prediction = "general"

            updated.append({
                "title": title,
                "excerpt": summary,
                "content": summary,
                "category": prediction,
                "author": article.get("source", "unknown"),
                "imageUrl": "https://source.unsplash.com/random/800x600",
                "publishDate": article.get("published", datetime.now().strftime("%a, %d %b %Y %H:%M:%S %z")),
                "readTime": f"{random.randint(3, 8)} min read",
                "likes": random.randint(100, 1000),
                "isFeatured": random.choice([True, False]),
                "isTrending": random.choice([True, False])
            })
        # Update cache
        global classified_news_cache
        classified_news_cache = updated
        print(f"[Scheduler] Classified {len(updated)} articles")
    except Exception as e:
        print("[Scheduler Error]", e)


# ⏰ Setup scheduler to run every 1 hour
scheduler = BackgroundScheduler()
scheduler.add_job(scheduled_classify_news, 'interval', hours=5)
scheduler.start()

@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()

# 🧠 Optional: endpoint to get cached articles from scheduler
@app.get("/cached-news")
def get_cached_news():
    return classified_news_cache
