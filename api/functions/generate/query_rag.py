import os
import json
import numpy as np
import faiss  # Ajout de FAISS pour stockage des vecteurs
import boto3
import tiktoken
import re

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


def search_knn(index, query_vector, n, k=5):
    """Effectue une recherche KNN dans FAISS."""
    distances, indices = index.search(query_vector, k)
    return get_adjacent_numbers(indices[0], n)  # Retourne les indices des passages les plus pertinents


def generate_rag_response(query, instruction, chunks, index,  model_llm ="mistral.mistral-7b-instruct-v0:2", model_emb="amazon.titan-embed-text-v2:0", k=5, again=False, begin=False):
    """Génère une réponse augmentée avec FAISS + LLM (Amazon Bedrock)."""
    query_vector = encode_query(query, model_emb=model_emb)

    if begin:
        retrieved_indices = range(16)
    else:
        retrieved_indices = search_knn(index, query_vector, len(chunks), k)

    
    retrieved_texts = [chunks[i] for i in retrieved_indices]

    # Highlighter les chunks dans la question
    #highlight_text_in_pdf(retrieved_texts)

    # Construire le contexte pour la génération de réponse
    context = " ".join(retrieved_texts)

    prompt = f"En tant qu'expert juridique spécialisé dans l'analyse de baux commerciaux français, examine attentivement l'extrait suivant d'un bail commercial et identifie précisément l'information demandée. Instruction importante : Réponds UNIQUEMENT avec la valeur demandée, sans explication ni commentaire. Extrait du bail à analyser : {context} \n Information recherchée : {query} \n Instruction : {instruction}"

    response = bedrock_runtime.invoke_model(
        modelId=model_llm,
        contentType="application/json",
        accept="application/json",
        body=json.dumps({"prompt": prompt, "max_tokens": 100, "temperature": 0.3})
    )

    json_response = json.loads(response["body"].read())
    rag_response = json_response['choices'][0]["message"]['content']
    stop_reason = json_response['choices'][0]['finish_reason']

    # Vérifier si la réponse contient 'oui' ou 'non' dans le cas d'une question fermée
    if contains_yes_no(instruction):
        if "oui" in rag_response.lower() and "non" not in rag_response.lower():
            rag_response = "Oui"
        elif "non" in rag_response.lower() and "oui" not in rag_response.lower():
            rag_response = "Non"
        elif not again:
            correction = "Tu dois absolument répondre par 'oui' ou 'non'. Si tu ne sais pas, réponds 'non'."
            return generate_rag_response(query, instruction + correction, chunks, index, model_llm, model_emb, k, again=True)
        else:
            rag_response = "Non"

    if stop_reason != 'stop' and not again:
        correction = "Reponds de façon encore plus concise"
        return generate_rag_response(query, instruction + correction, chunks, index, model_llm, model_emb, k, again=True)

    rag_response = re.sub(r'\n+', ' ', rag_response)  # Remplace un ou plusieurs '\n' par un seul espace        
    return rag_response


def contains_yes_no(text):
    keywords = {"oui", "non"}
    return any(word in text.lower() for word in keywords)


def get_adjacent_numbers(numbers, n):
    """Prend une liste de x entiers et retourne ces entiers avec leurs voisins adjacents entre 0 et n."""
    result = set()
    
    for num in numbers:
        for i in range(-3, 4):  # Prend l'élément, son précédent et son suivant
            new_num = num + i
            if 0 <= new_num <= n-1:  # Vérifier que c'est dans les bornes
                result.add(new_num)
    
    return sorted(result)