# AI DocAssistant

A Python-based tool designed to extract key information from PDF documents using AI-powered models. The system parses documents, retrieves relevant sections, and extracts the data points in a structured format.
![pipeline](./asset/pipeline.png)

## Project Structure
The core components of the project are:
- `read`: Parses any PDF and identifies different sections (headers, text, images, etc.).
- `retrieve`: Retrieves the relevant document chunks based on specified data points.
- `extract`: Extracts key data points from the relevant chunks, along with bounding box coordinates and references.
- `api`: Serves the product through an API, which takes PDFs as input and returns extracted data points.


```bash
doc-assistant/
│
├── api/                         # API routes and entry point
├── doc_assistant/
│   ├── pipelines/               # folder for different document pipelines
│   │   ├── epc.py               # Energy Performance Certificate pipeline
│   │   ├── invoice.py           # Invoice pipeline (can be added)
│   │   └── ...
│   ├── extract/                 # Extraction logic (e.g., extractor functions)
│   ├── read/                    # Parsing/reading logic
│   ├── retrieve/                # Logic to retrieve relevant chunks of text
│   ├── shared/                  # Shared entities and logic
│   └── config/                  # Configuration files for various document types
├── .env.sample                  # Template for environment variables
├── Makefile                     # Automation through make commands
├── README.md                    # Documentation
├── requirements.txt             # Python dependencies
```

## Requirements
- Python 3.10
- Virtual environment (`venv`)
- Libraries specified in `requirements.in`

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/.git
    cd gide_rag
    ```

2. **Set up a virtual environment**:
    Ensure Python 3.10 is installed, and create a virtual environment using the `Makefile`:
    ```bash
    make create-env
    ```

3. **Activate the virtual environment**:
    On macOS/Linux:
    ```bash
    source venv/bin/activate
    ```
    On Windows:
    ```bash
    venv\Scripts\activate
    ```

## Running Tests
To run backend tests using `pytest`, use:
```bash
make test
```

## API Usage
1. Run the FastAPI backend server:
```sh
make run-backend
```

2. Test the API with curl:
```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/extract/' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'document_type=epc' \
  -F 'language=en' \
  -F 'file=@doc_assistant/test_data/energy_performance_certificate_example.pdf'
  ```
