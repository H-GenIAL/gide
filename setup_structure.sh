#!/bin/bash
# Créer la structure de répertoires
mkdir -p doc_extraction/api/routes
mkdir -p doc_extraction/services
mkdir -p doc_extraction/pipelines/config/epc/datapoints
mkdir -p doc_extraction/pipelines/config/valuation_report/datapoints
mkdir -p doc_extraction/modules/reader/tasks
mkdir -p doc_extraction/modules/indexer
mkdir -p doc_extraction/modules/retriever
mkdir -p doc_extraction/modules/extractor
mkdir -p doc_extraction/modules/checker
mkdir -p doc_extraction/shared/database
mkdir -p doc_extraction/shared/entities
mkdir -p doc_extraction/shared/constants
mkdir -p doc_extraction/shared/utils
mkdir -p doc_extraction/tests/api
mkdir -p doc_extraction/tests/services
mkdir -p doc_extraction/tests/document
mkdir -p doc_extraction/tests/modules
mkdir -p doc_extraction/scripts
mkdir -p doc_extraction/config
mkdir -p doc_extraction/frontend/public
mkdir -p doc_extraction/frontend/src/components

# Création des fichiers avec un commentaire descriptif en entête

## Couche API
echo "# main.py : Point d'entrée de l'API (ex: FastAPI, Flask, etc.)" > doc_extraction/api/main.py
echo "# extraction.py : Endpoints pour l'extraction de documents" > doc_extraction/api/routes/extraction.py
echo "# healthcheck.py : Endpoint pour les vérifications de santé et du status" > doc_extraction/api/routes/healthcheck.py

## Services
echo "# extraction_service.py : Service d'orchestration pour l'extraction de documents" > doc_extraction/services/extraction_service.py
echo "# evaluation_service.py : Service pour l'exécution et le suivi des expérimentations" > doc_extraction/services/evaluation_service.py
echo "# database_service.py : Service pour les opérations CRUD et requêtes à la base de données" > doc_extraction/services/database_service.py

## Pipelines
echo "# document_pipeline.py : Orchestrateur principal du pipeline de document" > doc_extraction/pipelines/document_pipeline.py

# Configuration du pipeline EPC
echo "# prompts.yml : Templates de prompt pour l'extraction EPC" > doc_extraction/pipelines/config/epc/prompts.yml
echo "# energy_usage.yml : Définition des datapoints pour la consommation énergétique" > doc_extraction/pipelines/config/epc/datapoints/energy_usage.yml

# Configuration du pipeline Rapport de Valorisation
echo "# prompts.yml : Templates de prompt pour le rapport de valorisation" > doc_extraction/pipelines/config/valuation_report/prompts.yml
echo "# asset_value.yml : Définition des datapoints pour la valeur d'actif" > doc_extraction/pipelines/config/valuation_report/datapoints/asset_value.yml

## Modules
### Module Reader
echo "# reader_pipeline.py : Logique de lecture et découpage des documents" > doc_extraction/modules/reader/reader_pipeline.py
echo "# parsing.py : Tâche de parsing du contenu du document" > doc_extraction/modules/reader/tasks/parsing.py
echo "# chunking.py : Tâche de découpage des pages en chunks" > doc_extraction/modules/reader/tasks/chunking.py

### Module Indexer
echo "# indexer_pipeline.py : Logique d'indexation des documents" > doc_extraction/modules/indexer/indexer_pipeline.py

### Module Retriever
echo "# retriever_pipeline.py : Logique de récupération des chunks pertinents" > doc_extraction/modules/retriever/retriever_pipeline.py

### Module Extractor
echo "# extractor_pipeline.py : Logique d'extraction des données structurées" > doc_extraction/modules/extractor/extractor_pipeline.py

### Module Checker
echo "# checker_pipeline.py : Logique de validation des données extraites" > doc_extraction/modules/checker/checker_pipeline.py

## Shared
### Base de données
echo "# db.py : Configuration de la base de données (engine, session, etc.)" > doc_extraction/shared/database/db.py
echo "# models.py : Définition des modèles ORM pour la base de données" > doc_extraction/shared/database/models.py

### Entités
echo "# document.py : Définition de l'entité Document" > doc_extraction/shared/entities/document.py
echo "# chunk.py : Définition de l'entité Chunk" > doc_extraction/shared/entities/chunk.py
echo "# extracted_data.py : Définition de l'entité des données extraites" > doc_extraction/shared/entities/extracted_data.py

### Constantes
echo "# languages.py : Constantes pour les langues supportées" > doc_extraction/shared/constants/languages.py
echo "# document_types.py : Constantes et mappings pour les types de documents" > doc_extraction/shared/constants/document_types.py

### Utilitaires
echo "# logger.py : Configuration et utilitaires du logger" > doc_extraction/shared/utils/logger.py

## Tests
### Tests de l'API
echo "# test_api.py : Tests pour les endpoints API" > doc_extraction/tests/api/test_api.py

### Tests des Services
echo "# test_services.py : Tests pour la couche services" > doc_extraction/tests/services/test_services.py

### Tests du Pipeline Document
echo "# test_document_pipeline.py : Tests pour le pipeline de documents" > doc_extraction/tests/document/test_document_pipeline.py

### Tests des Modules
echo "# test_reader.py : Tests pour le module reader" > doc_extraction/tests/modules/test_reader.py
echo "# test_indexer.py : Tests pour le module indexer" > doc_extraction/tests/modules/test_indexer.py
echo "# test_retriever.py : Tests pour le module retriever" > doc_extraction/tests/modules/test_retriever.py
echo "# test_extractor.py : Tests pour le module extractor" > doc_extraction/tests/modules/test_extractor.py

## Scripts
echo "# setup.sh : Script d'installation et configuration du projet" > doc_extraction/scripts/setup.sh

## Configuration globale
echo "# .env : Variables d'environnement pour la configuration du projet" > doc_extraction/config/.env
echo "# config.yml : Fichier de configuration globale de l'application" > doc_extraction/config/config.yml

## Frontend (React)
### Fichiers publics et sources
echo "<!-- index.html : Fichier HTML principal pour le frontend React -->" > doc_extraction/frontend/public/index.html
echo "// App.js : Composant principal de l'application React" > doc_extraction/frontend/src/App.js
echo "// index.js : Point d'entrée de l'application React" > doc_extraction/frontend/src/index.js

### Fichier package.json
# Remarque : Le commentaire suivant n'est pas valide en JSON, c'est pour information uniquement.
echo "/* package.json : Configuration des dépendances et scripts du projet React */" > doc_extraction/frontend/package.json
cat << 'EOF' >> doc_extraction/frontend/package.json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {},
  "scripts": {}
}
EOF

### Documentation du Frontend
echo "# README.md : Documentation du frontend React" > doc_extraction/frontend/README.md

## Fichiers racine du projet
echo "# requirements.in : Liste de dépendances de base du projet" > doc_extraction/requirements.in
echo "# requirements.txt : Dépendances compilées du projet Python" > doc_extraction/requirements.txt
echo "# Makefile : Raccourcis pour build, tests, setup, etc." > doc_extraction/Makefile
echo "# Dockerfile : Instructions pour la création de l'image Docker du projet" > doc_extraction/Dockerfile
echo "# Jenkinsfile : Pipeline Jenkins pour le déploiement continu" > doc_extraction/Jenkinsfile
echo "# README.md : Documentation globale du projet" > doc_extraction/README.md

echo "Structure du projet créée avec succès."
