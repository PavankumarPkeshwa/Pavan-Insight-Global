import re

def clean_text(text):
    if not text or not isinstance(text, str):
        return ""

    text = re.sub(r"\s+", " ", text)  # remove extra spaces/newlines
    text = re.sub(r"http\S+", "", text)  # remove URLs
    return text.strip()
