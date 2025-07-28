import feedparser

# You can add more sources here
RSS_FEEDS = {
    "timesofindia": "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    "bbc": "http://feeds.bbci.co.uk/news/rss.xml",
    "reuters": "http://feeds.reuters.com/reuters/topNews"
}

def fetch_news():
    articles = []
    for source, url in RSS_FEEDS.items():
        feed = feedparser.parse(url)
        for entry in feed.entries:
            article = {
                "title": entry.get("title", ""),
                "summary": entry.get("summary", ""),
                "link": entry.get("link", ""),
                "published": entry.get("published", ""),
                "source": source
            }
            articles.append(article)
    return articles
