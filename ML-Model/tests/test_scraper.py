import sys
import os

# Add the root directory (ML-Model) to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from utils.scraper import fetch_google_news_rss

news = fetch_google_news_rss("technology", max_articles=5)

for article in news:
    print("====")
    print("📰", article["title"])
    print("🔗", article["url"])
    print("📄", article["text"][:300])  # Preview first 300 characters
