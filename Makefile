# Define variables
PYTHON_PROJECT_DIR = gide_rag
VENV_DIR = venv
PYTHON = $(VENV_DIR)/bin/python

# Default target
.DEFAULT_GOAL := help

# Help message
help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

# Create virtual environment, activate it and install backend dependencies
create-env:
	python3 -m venv $(VENV_DIR)
	. $(VENV_DIR)/bin/activate && pip install pip-tools && pip-compile requirements.in && pip install -r requirements.txt

# Run backend server

# Run the backend using Uvicorn
run-backend:
	$(VENV_DIR)/bin/uvicorn api.main:app --host 0.0.0.0 --port 3001 --reload

# Run Chroma vector db
run-vecdb:
	@echo "Running Vector Database server..."
	export PYTHONPATH=$(shell pwd) && chroma run --host localhost --port 8030 --path data/vecdb

# Run tests
test: ## Run backend tests with pytest
	@echo "Running tests..."
	${PYTHON} -m pytest $(TESTS_DIR)

# Clean up
clean: ## Clean up the environment
	rm -rf $(VENV_DIR)
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete

# Format backend code
format: ## Format backend code with black
	ruff format ${PYTHON_PROJECT_DIR}

lint:
	ruff check --fix gide_rag

# Install pre-commit hooks
install-hooks: ## Install pre-commit hooks
	pre-commit install

.PHONY: help create-env install test clean format lint install-hooks
