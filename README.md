# Automatisation de la Complétion d'une Fiche d'Audit

**GIDE LOYRETTE NOUEL A.A.R.P.I.**  
15 rue de Laborde - 75008 Paris  
Téléphone : +33 (0)1 40 75 60 00  
Email : info@gide.com  
Site : [gide.com](https://gide.com)  
Palais T03

## Aperçu

Ce projet automatise la complétion des fiches d'audit et l'extraction de données des baux commerciaux. Il aide les avocats en droit immobilier à analyser 5 à 10 baux commerciaux par opération immobilière pour vérifier leur conformité réglementaire et identifier les risques potentiels pour leurs clients.

## Problématique

Bien que la complétion des fiches d'audit soit essentielle, la tâche est chronophage et à faible valeur ajoutée du point de vue juridique. Les solutions existantes présentent les limitations suivantes :
- Exactitude insuffisante dans l'extraction des informations
- Mise en forme décevante ne correspondant pas aux attentes des professionnels

## Objectifs du Projet

1. Compléter automatiquement les fiches d'audit
2. Générer un fichier Excel unique contenant les informations pertinentes d'un ensemble de baux commerciaux
3. Atteindre une précision d'extraction d'au moins 80%
4. Produire des sorties aux formats `.docx` (fiches d'audit) et `.xlsx` (fichier Excel)
5. Respecter les templates et formats de mise en forme fournis

## Ressources

- 1 fiche d'audit vierge
- 1 fichier Excel vierge
- 2 fiches d'audit complétées avec leurs baux commerciaux associés
- 1 fichier Excel complété (2 lignes) avec 2 baux commerciaux associés
- 8 baux commerciaux (nombre à confirmer)

### Notes Importantes
- Les passages en jaune dans les fiches d'audit indiquent des informations issues de l'analyse de l'avocat et ne doivent pas être directement extraites
- Le programme doit être générique et s'adapter à différents types d'opérations immobilières
- En cas d'information non trouvée, le champ correspondant doit afficher : "Information non présente"

## Structure Détaillée du Projet

```
doc_extraction/
├── api/                    # API et points d'entrée
│   ├── main.py            # Point d'entrée principal de l'API
│   └── routes/
│       ├── extraction.py  # Routes pour l'extraction de documents
│       └── health.py      # Route de contrôle de santé
│
├── services/              # Services métier
│   ├── extraction.py      # Service d'extraction de données
│   ├── audit.py          # Service de génération des fiches d'audit
│   └── excel.py          # Service de génération Excel
│
├── pipelines/             # Pipelines de traitement
│   ├── document.py        # Pipeline principal
│   └── config/
│       ├── prompts/       # Templates de prompts
│       └── rules/         # Règles d'extraction
│
├── modules/               # Modules fonctionnels
│   ├── reader/           # Lecture de documents
│   ├── extractor/        # Extraction d'informations
│   ├── validator/        # Validation des données
│   └── formatter/        # Mise en forme des sorties
│
├── shared/               # Ressources partagées
│   ├── utils/           # Utilitaires communs
│   ├── constants.py     # Constantes globales
│   └── exceptions.py    # Exceptions personnalisées
│
├── tests/               # Tests
│   ├── unit/           # Tests unitaires
│   ├── integration/    # Tests d'intégration
│   └── fixtures/       # Données de test
│
├── scripts/             # Scripts utilitaires
│   ├── setup.sh        # Script d'installation Linux/Mac
│   ├── setup.bat       # Script d'installation Windows
│   └── update_deps.py  # Mise à jour des dépendances
│
├── config/             # Configuration
│   ├── .env.example   # Template de variables d'environnement
│   └── settings.py    # Paramètres de l'application
│
└── frontend/          # Interface utilisateur
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── utils/
    └── public/
```

## Installation et Configuration de l'Environnement

### Prérequis
- Python 3.8 ou supérieur
- Node.js 14 ou supérieur
- pip
- virtualenv

### Création de l'Environnement Virtuel

#### Windows
```bash
# Installation de virtualenv si nécessaire
pip install virtualenv

# Création de l'environnement virtuel
python -m venv venv

# Activation de l'environnement virtuel
venv\Scripts\activate

# Mise à jour de pip
python -m pip install --upgrade pip
```

#### macOS/Linux
```bash
# Installation de virtualenv si nécessaire
pip install virtualenv

# Création de l'environnement virtuel
python3 -m venv venv

# Activation de l'environnement virtuel
source venv/bin/activate

# Mise à jour de pip
pip install --upgrade pip
```

### Installation des Dépendances

1. **Cloner le Dépôt**
```bash
git clone <URL_DU_REPO>
cd <NOM_DU_REPO>
```

2. **Installer les Dépendances Python**
```bash
# Avec l'environnement virtuel activé
pip install -r requirements.txt
```

3. **Configuration de l'Environnement**
```bash
# Copier le fichier d'exemple de configuration
cp config/.env.example config/.env

# Éditer le fichier .env avec vos paramètres
# Windows
notepad config/.env
# macOS/Linux
nano config/.env
```

4. **Installation du Frontend**
```bash
cd frontend
npm install
```

### Gestion de l'Environnement Virtuel

#### Activation
Windows :
```bash
venv\Scripts\activate
```

macOS/Linux :
```bash
source venv/bin/activate
```

#### Désactivation
Pour tous les systèmes :
```bash
deactivate
```

#### Mise à jour des Dépendances
```bash
pip freeze > requirements.txt
```

## Utilisation

**Lancer l'API**
```bash
cd doc_extraction/api
uvicorn main:app --reload
```

**Exécuter les Tests**
```bash
pytest tests/
```

**Lancer le Frontend**
```bash
cd frontend
npm start
```

## Contributions

1. Forker le dépôt
2. Créer une branche pour votre fonctionnalité :
```bash
git checkout -b feature/nom-de-la-fonctionnalite
```
3. Commiter vos changements
4. Ouvrir une Pull Request

## Notre équipe

Alexandre, Anna, Lesley, Marius, Pierre, Vincent