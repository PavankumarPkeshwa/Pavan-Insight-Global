# utils/scraper.py
import feedparser
from newspaper import Article

def fetch_google_news_rss(keyword="India"):
    feed_url = f"https://news.google.com/rss/search?q={keyword}"
    feed = feedparser.parse(feed_url)
    
    articles = []
    for entry in feed.entries[:5]:  # limit to top 5
        try:
            url = entry.link
            article = Article(url)
            article.download()
            article.parse()
            articles.append({
                "title": article.title,
                "text": article.text,
                "url": url
            })
        except Exception as e:
            print(f"Error fetching article: {e}")
    
    return articles
