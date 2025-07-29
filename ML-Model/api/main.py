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

# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import joblib
# from scraper.scraper import fetch_news
# from datetime import datetime
# import random
# from apscheduler.schedulers.background import BackgroundScheduler

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

# # In-memory cache for auto-scheduled classification results
# classified_news_cache = []

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
#             "content": summary,
#             "category": prediction,
#             "author": source,
#             "imageUrl": "https://source.unsplash.com/random/800x600",
#             "publishDate": published,
#             "readTime": f"{random.randint(3, 8)} min read",
#             "likes": random.randint(100, 1000),
#             "isFeatured": random.choice([True, False]),
#             "isTrending": random.choice([True, False])
#         })

#     return classified_articles


# # 🔁 Background job function
# def scheduled_classify_news():
#     print("[Scheduler] Running scheduled news fetch & classify")
#     try:
#         articles = fetch_news()
#         updated = []
#         for article in articles:
#             title = article.get("title", "")
#             summary = article.get("summary", "")
#             text = f"{title} {summary}"
#             try:
#                 prediction = model.predict([text])[0]
#             except:
#                 prediction = "general"

#             updated.append({
#                 "title": title,
#                 "excerpt": summary,
#                 "content": summary,
#                 "category": prediction,
#                 "author": article.get("source", "unknown"),
#                 "imageUrl": "https://source.unsplash.com/random/800x600",
#                 "publishDate": article.get("published", datetime.now().strftime("%a, %d %b %Y %H:%M:%S %z")),
#                 "readTime": f"{random.randint(3, 8)} min read",
#                 "likes": random.randint(100, 1000),
#                 "isFeatured": random.choice([True, False]),
#                 "isTrending": random.choice([True, False])
#             })
#         # Update cache
#         global classified_news_cache
#         classified_news_cache = updated
#         print(f"[Scheduler] Classified {len(updated)} articles")
#     except Exception as e:
#         print("[Scheduler Error]", e)


# # ⏰ Setup scheduler to run every 1 hour
# scheduler = BackgroundScheduler()
# scheduler.add_job(scheduled_classify_news, 'interval', hours=5)
# scheduler.start()

# @app.on_event("shutdown")
# def shutdown_event():
#     scheduler.shutdown()

# # 🧠 Optional: endpoint to get cached articles from scheduler
# @app.get("/cached-news")
# def get_cached_news():
#     return classified_news_cache

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import joblib
from scraper.scraper import fetch_news
from datetime import datetime
import random
from apscheduler.schedulers.background import BackgroundScheduler

# 🌐 MongoDB Atlas Connection
MONGO_URI = "mongodb+srv://pavankumarp:44db3671KAKN@cluster0.rfawquf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["PavanInsightGlobal"]
collection = db["articles"]

# 🚀 FastAPI app setup
app = FastAPI()

# 🔓 CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧠 Load ML model
model = joblib.load("model/news_model.joblib")

# 🧾 Request & response models
class ArticleInput(BaseModel):
    title: str
    content: str

class ClassificationResult(BaseModel):
    category: str

# 🧠 In-memory cache
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

        article_data = {
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
        }

        classified_articles.append(article_data)

        # ⬇️ Insert into MongoDB (optional — usually handled by scheduler)
        try:
            collection.update_one(
                {"title": article_data["title"], "author": article_data["author"]},
                {"$set": article_data},
                upsert=True
            )
        except Exception as e:
            print("[MongoDB Insert Error]", e)

    return classified_articles


# 🔁 Background job to classify & store in MongoDB
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

            article_data = {
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
            }

            updated.append(article_data)

            # ⬇️ Insert into MongoDB
            try:
                collection.update_one(
                    {"title": article_data["title"], "author": article_data["author"]},
                    {"$set": article_data},
                    upsert=True
                )
            except Exception as e:
                print("[MongoDB Insert Error]", e)

        # Update in-memory cache
        global classified_news_cache
        classified_news_cache = updated
        print(f"[Scheduler] Classified and stored {len(updated)} articles")
    except Exception as e:
        print("[Scheduler Error]", e)


# ⏰ Setup scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(scheduled_classify_news, 'interval', hours=5)
scheduler.start()

@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()

# ✅ Get cached articles (from memory)
@app.get("/cached-news")
def get_cached_news():
    return classified_news_cache

# 📥 Get articles from MongoDB (permanently stored)
@app.get("/mongo-news")
def get_news_from_mongo():
    return list(collection.find({}, {"_id": 0}))
