import os

# Liste des dossiers à créer
directories = [
    'gide_rag/api/routes',
    'gide_rag/services',
    'gide_rag/pipelines/config/prompts',
    'gide_rag/pipelines/config/rules',
    'gide_rag/modules/reader',
    'gide_rag/modules/extractor',
    'gide_rag/modules/validator',
    'gide_rag/modules/formatter',
    'gide_rag/shared/utils',
    'gide_rag/tests/unit',
    'gide_rag/tests/integration',
    'gide_rag/tests/fixtures',
    'gide_rag/scripts',
    'gide_rag/config',
    'gide_rag/frontend/src/components',
    'gide_rag/frontend/src/pages',
    'gide_rag/frontend/src/utils',
    'gide_rag/frontend/public'
]

# Liste des fichiers à créer (vide)
files = [
    'gide_rag/api/main.py',
    'gide_rag/api/routes/extraction.py',
    'gide_rag/api/routes/health.py',
    'gide_rag/services/extraction.py',
    'gide_rag/services/audit.py',
    'gide_rag/services/excel.py',
    'gide_rag/pipelines/document.py',
    'gide_rag/shared/constants.py',
    'gide_rag/shared/exceptions.py',
    'gide_rag/scripts/setup.sh',
    'gide_rag/scripts/setup.bat',
    'gide_rag/scripts/update_deps.py',
    'gide_rag/config/.env.example',
    'gide_rag/config/settings.py'
]

def create_repo_structure():
    # Création des dossiers
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Dossier créé : {directory}")

    # Création des fichiers vides
    for filepath in files:
        # S'assurer que le dossier parent existe (il devrait déjà être créé)
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("")  # Fichier vide
        print(f"Fichier créé : {filepath}")

if __name__ == '__main__':
    create_repo_structure()
