import json

import pytest

from gide_rag.modules.extract.extractor_pipeline import Extractor
from gide_rag.shared.constants.document_types import DocumentType
from gide_rag.shared.entities import Chunk
from gide_rag.shared.entities.context import LLM
from gide_rag.shared.entities.datapoint import DataPoint


@pytest.mark.parametrize(
    "mock_chunks, datapoint, expected_value",
    [
        # Case 1: Valid input with a relevant chunk (address extraction)
        (
            [
                Chunk(
                    page_content="The property is located at 123 Main St.",
                    chunk_type="text",
                )
            ],
            DataPoint("address", "What is the address?"),
            "123 Main St.",
        ),
        # Case 2: No relevant chunk for the prompt
        (
            [
                Chunk(
                    page_content="This document does not mention an address.",
                    chunk_type="text",
                )
            ],
            DataPoint("address", "What is the address?"),
            "",
        ),
        # Case 3: Valid chunk for total floor area extraction
        (
            [
                Chunk(
                    page_content="The total floor area is 250 square meters.",
                    chunk_type="text",
                )
            ],
            DataPoint("floor_area", "What is the total floor area?"),
            "250 square meters",
        ),
    ],
)
def test_extract_data_point(mock_chunks, datapoint, expected_value):
    """
    Test the `extract_data_point` function using a live LLM model to verify that the correct data points
    are extracted from the relevant document chunks. The test validates that the returned string is
    a well-formed JSON, checks the presence of the expected data point key, and ensures that the value
    is of the expected type (a string).

    The `extract_data_point` function interacts with the live LLM model, using document chunks and a
    prompt to extract specific data points. This test ensures that the extractor behaves as expected
    without mocking the LLM response.

    Parameters:
        - mock_chunks (List[Chunk]): A list of document chunks that simulate relevant or irrelevant content.
        - data_point_prompt (str): The prompt passed to the extractor to retrieve a specific data point (e.g., "What is the address?").
        - expected_key (str): The key in the JSON response expected to be extracted (e.g., "address", "floor_area").

    Test Cases:
        1. Valid input with a relevant chunk: A chunk that contains the data point (e.g., an address) and should return a JSON
           with the expected key and value.
        2. No relevant data in the chunk: A chunk that doesn't contain the data point (e.g., the document doesn't mention the address),
           and the function should return an empty value for the data point.
        3. Valid chunk for extracting floor area: A chunk that contains a different data point (e.g., floor area) and should return
           the correct JSON structure for the `floor_area`.

    Assertions:
        1. The result is valid JSON.
        2. The expected key exists in the resulting JSON.
        3. The value associated with the key is a string (can be empty if no data is found).
    """

    llm = LLM()
    result = Extractor.extract_data_point(
        relevant_chunks=mock_chunks,
        datapoint=datapoint,
        llm=llm,
        doc_type=DocumentType.BAIL_IMMOBILIER,
    )

    try:
        json_result = json.loads(result)
        assert isinstance(
            json_result, dict
        ), "Result should be a valid JSON object (dictionary)"
    except json.JSONDecodeError as e:
        pytest.fail(f"Invalid JSON format: {e}")

    expected_key = datapoint.id
    assert (
        expected_key in json_result
    ), f"Expected key '{expected_key}' not found in the result"

    assert (
        expected_value in json_result[expected_key]
    ), f"Expected value '{expected_value}' not found in the result"
