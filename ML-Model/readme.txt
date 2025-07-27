ml-news/
│
├── app.py                # (Flask API - currently commented)
├── models/
│   ├── classifier.py
│   ├── summarizer.py
│   ├── ner.py
│
├── utils/
│   ├── scraper.py
│   ├── preprocess.py
│
├── test.py               # (optional script to test functionality)
├── requirements.txt      # flask, transformers, torch, newspaper3k, feedparser

Folder Structure Explanation:

    models/ — Holds your core ML functionalities:

        classifier.py: Likely for categorizing news (e.g. sports, politics, etc.)

        ner.py: Named Entity Recognition (find people, places, orgs)

        summarizer.py: Shortens long news articles into summaries

    utils/ — Utility scripts:

        preprocess.py: Cleans and prepares text before sending it to ML models

    test_data/sample_news.txt — Useful for testing the pipeline manually

    app.py — Main script where you'll probably expose ML endpoints (via Flask or FastAPI) to connect with your Node backend

    requirements.txt — Saves all dependencies needed to run the ML service
