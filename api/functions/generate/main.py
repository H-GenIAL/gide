# main.py

import tiktoken
import boto3
import json
import faiss
import requests
import pdfplumber
import numpy as np
import os
from create_database import MarkdownVectorizer
from query_rag import generate_rag_response
from json_storage_func import save_to_json, load_from_json
import nltk
nltk.download("punkt")
from nltk.tokenize import sent_tokenize

loaded_prompts = load_from_json("prompts_word3.json")

MODEL_LLM = "mistral.mistral-large-2407-v1:0"
MODEL_EMB = "amazon.titan-embed-text-v2:0"

answers_dict = dict()

def convert_to_md(pdf_file):
    """
    Convertit un fichier en format Markdown (.md).

    Arguments:  
    file_path : str -- Chemin du fichier à convertir.

    Returns:
    None
    """
    md_content = ""

    # Traitement du PDF
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                md_content += text + "\n\n"  # Ajoute une nouvelle ligne entre les pages
    
    return md_content

def process_function(pdf_file):
    print("Convert to md...")
    content_md = convert_to_md(pdf_file)
    print("Vectorize...")
    vectorizer = MarkdownVectorizer(model_emb=MODEL_EMB)
    chunks, vectors = vectorizer.process_text(content_md)
    print("Base vectorisée !")
    return chunks, vectors

def query_iterate(index, chunks, model_emb= MODEL_EMB, model_llm=MODEL_LLM):

    for prompt in loaded_prompts:
        query = prompt["query"]
        instruction = prompt["instruction"]

        if prompt["id"] == "bailleur" or prompt["id"] == "preneur":
            response = generate_rag_response(query, instruction, chunks, index, model_llm=model_llm, model_emb=model_emb, k=5, begin=True)
        else:
            response = generate_rag_response(query, instruction, chunks, index, model_llm=model_llm, model_emb=model_emb, k=5)
        #print("\n🔮 Réponse générée :")
    
        print(response)
        answers_dict[prompt["id"]] = response
        #print("Réponse sauvegardée !")
        
    return answers_dict

# 🔹 Chemin vers la base FAISS
FAISS_INDEX_PATH = "faiss_index.bin"

if __name__ == "__main__":
    chunks, vectors = process_function()
    save_to_json(chunks, "chunks.json")
    print("Charge l'index FAISS...")
    index = faiss.read_index(FAISS_INDEX_PATH)
    chunks = load_from_json("chunks.json")
    print("🔍 Index FAISS chargé ! Itération ...")

    query_iterate(index, chunks)
    print(answers_dict)
