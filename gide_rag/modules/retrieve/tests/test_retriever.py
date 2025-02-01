import pytest

from gide_rag.modules.retrieve.retriever_pipeline import retrieve_relevant_chunks
from gide_rag.shared.entities.chunk import Chunk


@pytest.mark.parametrize(
    "dummy_chunks, prompt, expected_chunk_content",
    [
        # Test case 1: Looking for a table chunk
        (
            [Chunk("header_chunk"), Chunk("text_chunk"), Chunk("table_chunk")],
            "Find the relevant table",
            "table_chunk",
        ),
        # Test case 2: Looking for a text chunk
        (
            [Chunk("header_chunk"), Chunk("text_chunk"), Chunk("table_chunk")],
            "Find the relevant text",
            "text_chunk",
        ),
        # Test case 3: Looking for a header chunk
        (
            [Chunk("header_chunk"), Chunk("text_chunk"), Chunk("table_chunk")],
            "Find the relevant header",
            "header_chunk",
        ),
    ],
)
def test_retrieve_relevant_chunks(dummy_chunks, prompt, expected_chunk_content):
    """
    Parametrized test for the retrieve_relevant_chunks function. Tests different scenarios
    with various prompts and checks if the correct chunk is retrieved.

    Parameters:
        - dummy_chunks: A list of chunks simulating different sections of a document.
        - prompt: The prompt to search for a relevant chunk.
        - expected_chunk_content: The expected chunk content if a match is found; otherwise, None.
    """

    relevant_chunks = retrieve_relevant_chunks(dummy_chunks, prompt)

    assert relevant_chunks[0].page_content == expected_chunk_content
