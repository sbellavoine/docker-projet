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
