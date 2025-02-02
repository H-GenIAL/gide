import tiktoken
import boto3
import json
import faiss
import requests
import numpy as np

# Définir le chemin du fichier Markdown
md_file = "Bail StockWay.md"

# Lire tout le contenu dans une variable string
with open(md_file, "r", encoding="utf-8") as file:
    md_content = file.read()

print(md_content[:400])  # Affiche le contenu du fichier dans la console

# Définir la fonction de découpage
def split_text(text, chunk_size=500, overlap=100):
    encoding = tiktoken.get_encoding("cl100k_base")
    tokens = encoding.encode(text)
    
    chunks = []
    for i in range(0, len(tokens), chunk_size - overlap):
        chunk = tokens[i : i + chunk_size]
        chunks.append(encoding.decode(chunk))
    
    return chunks

# Découper le texte
chunks = split_text(md_content, chunk_size=500, overlap=100)
print(f"{len(chunks)} chunks générés.")
print(len(md_content))


bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-west-2")

vectors = []
for chunk in chunks:
    response = bedrock_runtime.invoke_model(
        modelId="amazon.titan-embed-text-v2:0",
        contentType="application/json",
        accept="application/json",
        body=json.dumps({"inputText": chunk})
    )
    embedding = json.loads(response["body"].read())["embedding"]
    vectors.append(embedding)

# Convertir la liste de listes en un tableau NumPy 2D
vectors = np.array(vectors, dtype=np.float32)

# Vérifier la forme du tableau (nombre de vecteurs, dimension des embeddings)
print("Shape of vectors array:", vectors.shape)

print("Vectorisation terminée !")


for i, vector in enumerate(vectors):
    document = {
        "text": chunks[i],
        "vector": vector
    }

# 📌 **Créer l'index FAISS**
dimension = vectors.shape[1]  # Dimension des embeddings
index = faiss.IndexFlatL2(dimension)  # Index de type L2 (distance Euclidienne)

# **🔴 Éviter la duplication des vecteurs en réinitialisant l'index**
index.reset()  # Réinitialise FAISS avant d'ajouter de nouveaux vecteurs

index.add(vectors)  # Ajouter les vecteurs à FAISS

print("Vectorisation et stockage FAISS terminés !")

# 🔎 **Rechercher les passages les plus pertinents**
query = "Quel est le nom du bailleur ?"

# Transformer la question en vecteur
query_response = bedrock_runtime.invoke_model(
    modelId="amazon.titan-embed-text-v2:0",
    contentType="application/json",
    accept="application/json",
    body=json.dumps({"inputText": query})
)
query_vector = json.loads(query_response["body"].read())["embedding"]

query_vector = np.array(query_vector, dtype=np.float32).reshape(1, -1)

# 📌 **Effectuer la recherche KNN**
k = 3  # 🔴 Modifier selon le nombre de résultats souhaités
distances, indices = index.search(query_vector, k)

# 📜 **Récupérer les passages les plus pertinents**
retrieved_texts = [chunks[i] for i in indices[0]]

print("\n🔎 Passages les plus pertinents trouvés :")
for text in retrieved_texts:
    print("\n➜", text)

# 📝 **Construire le contexte pour la génération de réponse**
context = " ".join(retrieved_texts)

prompt = f"En utilisant les informations suivantes, réponds à cette question :\n\n{context}\n\nQuestion: {query}\nRéponse:"

# **(Facultatif) Utiliser un modèle LLM pour générer une réponse**
print("\n📌 Voici le prompt utilisé pour la génération de réponse :")
print(prompt)


response = bedrock_runtime.invoke_model(
    modelId="mistral.mistral-7b-instruct-v0:2",
    contentType="application/json",
    accept="application/json",
    body=json.dumps({"prompt": prompt, "max_tokens": 300})
)

rag_response = json.loads(response["body"].read())
print("Réponse augmentée :", rag_response)
