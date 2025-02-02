import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_KEY = os.getenv("OPENAI_KEY")
if OPENAI_KEY is None:
    raise ValueError("The environment variable OPENAI_KEY is not set")

EMBEDDING_ENGINE = "text-embedding-ada-002"

EMBEDDING_CONF = {
    "text-embedding-ada-002": {"model": "cl100k_base", "ctx_length": 8191}
}

TEXT_COMPLETION_ENGINE = "gpt-4o"
IMAGE_COMPLETION_ENGINE = "gpt-4o"
