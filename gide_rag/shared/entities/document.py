from dataclasses import dataclass
from langchain_community.document_loaders import PyPDFLoader
from gide_rag.shared.constants.languages import Language
from datetime import datetime
import os


@dataclass
class Document:
    filepath: str
    language: Language

    def __post_init__(self) -> None:
        self.loader = PyPDFLoader(self.filepath)
        base_name = os.path.basename(self.filepath)
        now = datetime.now().strftime("%Y%m%d%H%M%S")
        self.filename = f"{now}_{base_name}"
