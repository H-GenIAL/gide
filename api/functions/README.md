# API Functions

This folder contains the AWS Lambda functions for the Gide project. These serverless functions handle various API endpoints and data processing tasks.

## Project Structure

```bash
api/functions/
├── export/          # Function for exporting the structured data to a template Word document
└── import/          # Function handling the generation of the structured data from the uploaded PDF
```

## Export

The export lambda function generates a Word document from the structured data.

## Import

The import lambda function generates the structured data from the uploaded PDF

## Requirements

- Python 3.13
- Virtual environment (`venv`)
- Libraries specified in `requirements.txt`
