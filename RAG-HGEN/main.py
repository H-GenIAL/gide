# main.py

import tiktoken
import boto3
import json
import faiss
import requests
import numpy as np
import os
from pdf_processing import process_pdf
from create_database import MarkdownVectorizer
from query_rag import generate_rag_response
from json_storage_func import save_to_json, load_from_json

loaded_prompts = load_from_json("prompts_word.json")


MODEL_LLM = "mistral.mistral-7b-instruct-v0:2"
MODEL_EMB = "amazon.titan-embed-text-v2:0"

answers_dict = dict()


def process_function():

    print("Process PDF...")
    process_pdf()
    print("Done")

    print("Vectorize...")
    vectorizer = MarkdownVectorizer(model_emb=MODEL_EMB)
    chunks, vectors = vectorizer.process()
    print("Base vectorisée !")
    return chunks, vectors

def query_iterate(index, chunks, model_emb= MODEL_EMB, model_llm=MODEL_LLM):

    for prompt in loaded_prompts:
        query = prompt["query"]
        instruction = prompt["instruction"]
        response = generate_rag_response(query, instruction, chunks, index, model_llm=model_llm, model_emb=model_emb, k=3)['outputs'][0]['text']
        print("\n🔮 Réponse générée :")
        print(response)
        answers_dict[prompt["id"]] = response
        print("Réponse sauvegardée !")

    return answers_dict

# 🔹 Chemin vers la base FAISS
FAISS_INDEX_PATH = "faiss_index.bin"

if __name__ == "__main__":
    chunks, vectors = process_function()
    save_to_json(chunks, "chunks.json")
    print("Charge l'index FAISS...")
    index = faiss.read_index(FAISS_INDEX_PATH)
    #chunks = load_from_json("chunks.json")
    print("🔍 Index FAISS chargé ! Itération ...")

    query_iterate(index, chunks)
    print(answers_dict)
