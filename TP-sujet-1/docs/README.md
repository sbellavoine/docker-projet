Corentin
reefox.
En ligne

[10:35]Corentin: jpp
[10:37]Soraya: ÔOmTSAePK6UZJDOaRcZ8
[12:11]Corentin: par contre,
[08:13]Soraya: npagies@myges.fr
[09:14]Soraya: P19/20 - menace x gravité ou je ne sais quoi
Corentin
 a commencé un appel qui a duré une minute. — 06/03/2026 09:47
Corentin
 a commencé un appel qui a duré 7 minutes. — 06/03/2026 09:49
[09:50]Soraya:
Type de fichier joint : document
Etude de cas groupe pharmasanté.docx
37.48 KB
Type de fichier joint : acrobat
référentiel gouvernance SI.pdf
388.01 KB
Type de fichier joint : acrobat
CORRECTION DES EXERCICES.pdf
446.41 KB
Type de fichier joint : acrobat
le management du si.pdf
853.78 KB
Type de fichier joint : acrobat
EXEMPLE DE STRATEGIE SI EN COHERENCE AVEC LA STRATEGIE D ENTREPRISE.pdf
436.58 KB
Type de fichier joint : acrobat
FEUILLE DE ROUTE MAJ.pdf
406.42 KB
Corentin
 a commencé un appel qui a duré 3 heures. — 06/03/2026 09:56
[10:23]Corentin:
Image
[14:25]Soraya: git@github.com:sbellavoine/docker-projet.git
[14:28]Soraya: https://github.com/sbellavoine/docker-projet
GitHub
GitHub - sbellavoine/docker-projet
Contribute to sbellavoine/docker-projet development by creating an account on GitHub.
Contribute to sbellavoine/docker-projet development by creating an account on GitHub.
[17:20]Soraya: TP-sujet-1
│
├── compose.yaml
├── .env
├── README.md
│
├── docs
│   ├── api.md
│   └── architecture.md
│
├── nginx
│   └── nginx.conf
│
├── orders-service
│   ├── node_modules
│   ├── .dockerignore
│   ├── app.js
│   ├── Dockerfile
│   ├── init.sql
│   ├── package-lock.json
│   └── package.json
│
├── products-service
│   ├── node_modules
│   ├── .dockerignore
│   ├── app.js
│   ├── Dockerfile
│   ├── init.sql
│   ├── package-lock.json
│   └── package.json
│
└── users-service
    ├── .dockerignore
    ├── app.js
    ├── Dockerfile
    ├── init.sql
    └── package.json
[17:34]Corentin:
# Projet Docker — "Microservices from Scratch"

Ce projet est une petite plateforme e-commerce basée sur une architecture microservices avec Docker.

Chaque service fonctionne dans un conteneur différent et communique via un réseau Docker.

README.md
3 Ko
[17:52]Soraya:
# Projet Docker - Microservices from Scratch

Ce projet est une petite plateforme e-commerce basée sur une architecture microservices avec Docker.

Chaque service tourne dans un conteneur différent.

README.md
3 Ko
﻿
Soraya
spmbl
 
# Projet Docker - Microservices from Scratch

Ce projet est une petite plateforme e-commerce basée sur une architecture microservices avec Docker.

Chaque service tourne dans un conteneur différent.

Les services présents dans le projet :

- API Gateway (Nginx)
- Users API (Node.js + Express)
- Products API
- Orders API
- PostgreSQL pour les bases de données

Toutes les requêtes passent par la gateway.

# Architecture

Les services sont organisés comme ceci :

```
Client
   |
   v
API Gateway (Nginx) :80
   |
   |----> Users API :5001
   |----> Products API :5002
   |----> Orders API :5003
```

Chaque service possède sa propre base de données PostgreSQL.

Les conteneurs communiquent entre eux via les réseaux Docker définis dans `compose.yaml`.

# Lancer le projet

Se placer dans le dossier du projet :

```
cd TP-sujet-1
```

Lancer tous les conteneurs :

```
docker compose up --build
```

Vérifier que les conteneurs tournent :

```
docker ps
```

Tester la gateway :

```
curl http://localhost/health
```

# API disponibles

Les routes passent par la gateway.

Users :

```
/api/users
```

Products :

```
/api/products
```

Orders :

```
/api/orders
```

# Tester Users API

Créer un utilisateur :

```
curl -Method POST http://localhost/api/users -Headers @{ "Content-Type" = "application/json" } -Body '{"username":"Soraya","email":"sorayabellavoine@mail.com","password":"123abc"}'
```

Voir les utilisateurs :

```
curl http://localhost/api/users
```

Voir un utilisateur :

```
curl http://localhost/api/users/1
```

# Arrêter le projet

Arrêter les conteneurs :

```
docker compose down
```

Supprimer les volumes :

```
docker compose down -v
```

# Structure du projet

```
TP-sujet-1
│
├── compose.yaml
├── .env
│
├── docs
│   ├── README.md
│   ├── architecture.md
│   └── api.md
│
├── nginx
│   └── nginx.conf
│
├── users-service
├── products-service
└── orders-service
README.md
3 Ko