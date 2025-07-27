import feedparser
from newspaper import Article

def fetch_google_news_rss(query: str, max_articles: int = 10):
    query = query.replace(" ", "+")
    url = f"https://news.google.com/rss/search?q={query}&hl=en-IN&gl=IN&ceid=IN:en"
    feed = feedparser.parse(url)

    articles = []
    count = 0

    for entry in feed.entries:
        if count >= max_articles:
            break

        print(f"📰 Processing: {entry.title}")
        article = Article(entry.link)

        try:
            article.download()
            article.parse()
            full_text = article.text.strip()
        except Exception as e:
            print(f"⚠️ Error downloading/parsing: {entry.link} -> {str(e)}")
            full_text = ""

        # Fallback to RSS summary if full text is unavailable
        if not full_text:
            full_text = entry.get("summary", "").strip()
            print(f"🔗 Feed content fallback: {entry.title}")

        if not full_text:
            print(f"⚠️ Skipped empty article: {entry.link}")
            continue

        articles.append({
            "title": article.title,
            "text": full_text,
            "url": entry.link,
            "top_image": article.top_image,
            "publish_date": article.publish_date,
            "author": article.authors[0] if article.authors else "Unknown"
        })

        count += 1

    return articles
