from openai import OpenAI
import warnings
import tiktoken
from llm.open_ai.conf import (
    OPENAI_KEY,
    EMBEDDING_CONF,
    EMBEDDING_ENGINE,
    TEXT_COMPLETION_ENGINE,
)
from typing import Any

warnings.filterwarnings("ignore")


class Open_AI:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=OPENAI_KEY)

    def embedding(self, text: str, engine: str = EMBEDDING_ENGINE) -> list:
        encoding = tiktoken.get_encoding(EMBEDDING_CONF[engine]["model"])
        text = text.replace("\n", " ")
        res = encoding.encode(text)[: EMBEDDING_CONF[engine]["ctx_length"]]
        return (
            self.client.embeddings.create(input=[encoding.decode(res)], model=engine)
            .data[0]
            .embedding
        )

    def completion(
        self,
        content: Any,
        temperature: float,
        top_p: float,
        max_tokens: int,
        model: str = TEXT_COMPLETION_ENGINE,
    ) -> str:
        response = self.client.chat.completions.create(
            model=model,
            #! Customized the system prompt
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": content},
            ],
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
        )
        llm_answer = response.choices[0].message.content

        return llm_answer
