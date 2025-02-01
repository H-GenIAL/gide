import logging
from enum import Enum
import yaml
from typing import List

from gide_rag.shared.entities.datapoint import DataPoint
from gide_rag.shared.constants import CONFIG_DIRECTORY, DocumentType
from gide_rag.shared.constants.languages import Language
import os

logger = logging.getLogger(__name__)

DATA_POINTS = "datapoints/"
ID = "id"
TYPE = "type"
UNIT = "unit"
NAME = "name"
TOP_K = "top_k"
BM25_QUERY = "bm25_query"
SEMANTIC_QUERY = "semantic_query"
RETRIEVER_STRATEGY = "retriever_strategy"
GENERATOR = "generator"
GENERATOR_QUERY = "query"
GENERATOR_INSTRUCTION = "instruction"
GENERATOR_CONF = "conf"

DATAPOINT_FOLDER = DATA_POINTS


def load_datapoints_from_yaml(
    document_type: DocumentType, language: Language
) -> List[DataPoint]:
    """
    Function to load the YAML config for a specific document type and dynamically instantiate DataPoint objects.

    Args:
        document_type (str): The document type (e.g., "energy_performance_certificate", "invoice")

    Returns:
        List[DataPoint]: A list of dynamically created DataPoint objects.
    """

    if isinstance(document_type, Enum):
        doc_type = document_type.value
    else:
        doc_type = document_type
    config_directory = CONFIG_DIRECTORY / doc_type / DATAPOINT_FOLDER

    if not config_directory.exists():
        raise FileNotFoundError(
            f"Configuration file not found for document type '{doc_type}', expected at: {config_directory}"
        )

    datapoints = []
    for file_dp in os.listdir(config_directory):
        if file_dp.endswith(".yml"):
            with open(config_directory / file_dp, "r") as file:
                dp_config = yaml.safe_load(file)
            dp_instance = DataPoint(
                id=dp_config.get(ID),
                unit=dp_config.get(UNIT),
                name=dp_config.get(NAME),
                type=dp_config.get(TYPE),
                top_k=dp_config.get(TOP_K),
                bm25_query=dp_config.get(BM25_QUERY).get(language.value),
                semantic_query=dp_config.get(SEMANTIC_QUERY).get(language.value),
                retriever_strategy=dp_config.get(RETRIEVER_STRATEGY),
                generator_query=dp_config.get(GENERATOR)
                .get(GENERATOR_QUERY)
                .get(language.value),
                generator_instruction=dp_config.get(GENERATOR)
                .get(GENERATOR_INSTRUCTION)
                .get(language.value),
                generator_conf=dp_config.get(GENERATOR).get(GENERATOR_CONF),
            )
            datapoints.append(dp_instance)

    return datapoints
