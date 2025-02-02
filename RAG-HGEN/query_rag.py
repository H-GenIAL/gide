import os
import json
import numpy as np
import faiss  # Ajout de FAISS pour stockage des vecteurs
import boto3
import tiktoken


bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-west-2")

def encode_query(query, model_emb="amazon.titan-embed-text-v2:0"):
    """Encode une question en embedding avec Amazon Bedrock."""
    response = bedrock_runtime.invoke_model(
        modelId=model_emb,
        contentType="application/json",
        accept="application/json",
        body=json.dumps({"inputText": query})
    )
    embedding = json.loads(response["body"].read())["embedding"]
    return np.array(embedding, dtype=np.float32).reshape(1, -1)  # Transformer en 2D


def search_knn(index, query_vector, n, k=3):
    """Effectue une recherche KNN dans FAISS."""
    distances, indices = index.search(query_vector, k)
    return get_adjacent_numbers(indices[0], n)  # Retourne les indices des passages les plus pertinents


def generate_rag_response(query, instruction, chunks, index, model_llm ="mistral.mistral-7b-instruct-v0:2", model_emb="amazon.titan-embed-text-v2:0", k=3):
    """Génère une réponse augmentée avec FAISS + LLM (Amazon Bedrock)."""
    query_vector = encode_query(query, model_emb=model_emb)
    retrieved_indices = search_knn(index, query_vector, len(chunks), k)

    retrieved_texts = [chunks[i] for i in retrieved_indices]

    # Construire le contexte pour la génération de réponse
    context = " ".join(retrieved_texts)

    prompt = f"En utilisant les informations suivantes :\n\n{context}\n\n Reponds uniquement à cette question: {query} tout en suivant les instructions suivantes: {instruction}"

    response = bedrock_runtime.invoke_model(
        modelId=model_llm,
        contentType="application/json",
        accept="application/json",
        body=json.dumps({"prompt": prompt, "max_tokens": 100})
    )

    rag_response = json.loads(response["body"].read())
    return rag_response



def get_adjacent_numbers(numbers, n):
    """Prend une liste de 3 entiers et retourne ces entiers avec leurs voisins adjacents entre 0 et n."""
    result = set()
    
    for num in numbers:
        for i in range(-2, 3):  # Prend l'élément, son précédent et son suivant
            new_num = num + i
            if 0 <= new_num <= n:  # Vérifier que c'est dans les bornes
                result.add(new_num)
    
    return sorted(result)