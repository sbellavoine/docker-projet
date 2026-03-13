# Schéma d'architecture

Le projet est basé sur une architecture microservices avec Docker.

Chaque service tourne dans un conteneur différent.

Il y a :

- une API Gateway avec Nginx
- un service Users (Node.js + Express)
- une base de données PostgreSQL pour les utilisateurs

Toutes les requêtes passent par la gateway.

Le client envoie une requête à la gateway sur le port 80.

Ensuite Nginx redirige la requête vers le bon service.

Dans notre cas la route `/api/users` est envoyée vers le service users.

Le service users communique avec sa base PostgreSQL via le réseau Docker.

Schéma simple :

```
Client
   |
   v
API Gateway (Nginx)  :80
   |
   v
Users API (Node.js)  :5001
   |
   v
PostgreSQL           :5432
```

Tous les conteneurs communiquent via le réseau Docker `ecommerce-network`.