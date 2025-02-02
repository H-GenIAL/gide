# Configuration d'AWS CLI

Ce guide vous aidera à configurer AWS CLI sur votre machine et à installer les packages nécessaires.

## Prérequis

- Avoir installé **AWS CLI** ([Télécharger ici](https://aws.amazon.com/cli/))
- Avoir un compte AWS et des **AWS Access Keys**
- Python 3.11

## Configuration de AWS CLI

1. **Ouvrir le terminal** (PowerShell, CMD, Terminal Linux ou Terminal VS Code)
2. Exécuter la commande suivante :
    ```bash
    aws configure
    ```
3. Fournir les informations demandées :
    - **AWS Aaut** us-west-2
    - **Format de sortie par défaut** json

4. Vérifier la cccess Key ID** (fourni par AWS IAM)
    - **AWS Secret Access Key** (fourni par AWS IAM)
    - **Région AWS par défonnexion avec AWS en testant :
    ```bash
    aws sts get-caller-identity
    ```
    Cette commande doit afficher votre ID utilisateur AWS et le compte associé.

### Fichiers de configuration AWS

AWS CLI stocke vos informations dans les fichiers suivants :

- `~/.aws/credentials` (Contient les clés d'accès)
- `~/.aws/config` (Contient la région et d'autres paramètres)

### Vérification de la configuration

Testez la connexion à un service AWS, par exemple pour lister les buckets S3 :

```bash
aws s3 ls
```

## Tester la lambda function

1. **Installez les packages requis**

```bash
pip install -r requirements.txt
```

2. **Exécutez la lambda function**

```bash
python lambda_function.py
```

Le test va saisir le fichier `./data/input.pdf` et va renvoyer un json avec les réponses.
Il simule le comportement d'un utilisateur, qui envoie un fichier PDF à la lambda function via une requête HTTP POST.

## Ressources utiles

- [Documentation officielle AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/)
- [Configuration des credentials AWS](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
- [AWS IAM et gestion des permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
