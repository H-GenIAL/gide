import json

def save_to_json(chunks, filename="chunks.json"):
    """Stocke une liste de chaînes de caractères dans un fichier JSON."""
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=4)

def load_from_json(filename="chunks.json"):
    """Charge une liste de chaînes de caractères depuis un fichier JSON."""
    try:
        with open(filename, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []  # Retourne une liste vide si le fichier n'existe pas
