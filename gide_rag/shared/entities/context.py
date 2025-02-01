from dataclasses import dataclass
from typing import List

from gide_rag.shared.config_loaders.config_datapoint import (
    load_datapoints_from_yaml,
)
from gide_rag.shared.constants import DocumentType
from gide_rag.shared.entities.datapoint import DataPoint
from gide_rag.shared.entities.document import Document
from llm.open_ai.client import Open_AI


class LLM(Open_AI):
    def __init__(self):
        return


class ExtractionConfiguration:
    def __init__(self, config):
        self.__dict__.update(config)


@dataclass
class Context:
    document: Document
    document_type: DocumentType
    llm: LLM = LLM()
    datapoints: List[DataPoint] = None

    def __post_init__(self) -> None:
        self.datapoints = load_datapoints_from_yaml(
            self.document_type, self.document.language
        )
