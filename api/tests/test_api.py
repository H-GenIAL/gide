from fastapi.testclient import TestClient

from api.main import app
from gide_rag.shared.constants.path import TEST_DATA_DIR

client = TestClient(app)


def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Document Extraction API is running."}


def test_extract_epc():
    TEST_FILE = "Bail_immobilier_test.pdf"
    file_path = TEST_DATA_DIR / TEST_FILE
    print(file_path)

    with open(file_path, "rb") as file:
        response = client.post(
            "/extract/",
            data={"document_type": "bail_immo", "language": "fr"},
            files={"file": file},
        )

    assert response.status_code == 200
    assert "data" in response.json()
