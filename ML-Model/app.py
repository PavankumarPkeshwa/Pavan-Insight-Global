import uuid
from datetime import datetime
from models.summarizer import summarize_text
from models.classifier import classify_news
from models.ner import extract_entities
from utils.preprocess import clean_text
from utils.scraper import fetch_google_news_rss


def estimate_read_time(text):
    words = len(text.split())
    return max(1, round(words / 200))


def process_articles(raw_articles):
    processed = []

    for i, article in enumerate(raw_articles):
        print(f"\n--- News {i+1} ---")

        try:
            cleaned = clean_text(article["text"])
            if not cleaned or len(cleaned) < 30:
                raise ValueError("Text too short or empty")

            summary = summarize_text(cleaned)
            category = classify_news(cleaned)
            entities = extract_entities(cleaned)

            print(f"📰 Title: {article['title']}")
            print(f"🔗 URL: {article['url']}")
            print(f"🧾 Cleaned Text: {cleaned[:200]}...")  # preview
            print(f"📝 Summary: {summary}")
            print(f"🏷️ Category: {category}")
            print(f"🧠 Entities: {entities}")

            processed.append({
                "_id": str(uuid.uuid4()),
                "title": article["title"],
                "excerpt": summary,
                "content": cleaned,
                "author": article["author"],
                "category": category,
                "imageUrl": article["top_image"],
                "publishDate": article["publish_date"] or datetime.utcnow(),
                "readTime": estimate_read_time(cleaned),
                "likes": 0,
                "isFeatured": False,
                "isTrending": False,
                "url": article["url"],
                "entities": entities
            })

        except Exception as e:
            print(f"❌ Error processing article: {str(e)}")

    return processed


if __name__ == "__main__":
    print("🔍 Fetching news...")
    articles = fetch_google_news_rss(query="technology", max_articles=5)
    data = process_articles(articles)

    # Optional: Insert into MongoDB
    # from db import insert_many_articles
    # insert_many_articles(data)

    print("\n✅ All articles processed.")


# app.py

# from utils.scraper import fetch_google_news_rss
# from utils.preprocess import clean_text
# from models.summarizer import summarize_text
# from models.classifier import classify_news
# from models.ner import extract_entities

# if __name__ == "__main__":
#     print("🔍 Fetching top news...")
#     news_list = fetch_google_news_rss("technology")  # You can change keyword here

#     for i, news in enumerate(news_list[:3]):
#         print(f"\n--- News {i+1} ---")
#         print("📰 Title:", news["title"])
#         print("🔗 URL:", news["url"])

#         cleaned_text = clean_text(news["text"])
#         print("🧾 Cleaned Text:", repr(cleaned_text))

#         if len(cleaned_text.strip()) < 5:
#             print("⚠️ Skipping: Text too short for classification\n")
#             continue

#         summary = summarize_text(cleaned_text)
#         category = classify_news(cleaned_text)
#         entities = extract_entities(cleaned_text)

#         print("📝 Summary:", summary)
#         print("🏷️ Category:", category)
#         print("🧠 Entities:", [e['word'] for e in entities])

