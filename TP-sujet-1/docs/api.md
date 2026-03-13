# Documentation des API

Ce projet contient une API pour gérer les utilisateurs.

Toutes les requêtes passent par la gateway nginx.

Base URL :

```
http://localhost/api/users
```

# Healthcheck

Permet de vérifier que le service fonctionne.

```
GET /health
```

# Voir tous les utilisateurs

```
GET /api/users
```

Cette route retourne la liste des utilisateurs enregistrés.

# Voir un utilisateur

```
GET /api/users/:id
```

Permet de récupérer un utilisateur avec son id.

# Créer un utilisateur

```
POST /api/users
```

Exemple de body :

```
{
  "username": "Soraya",
  "email": "sorayabellavoine@mail.com",
  "password": "123abc"
}
```

Cette route crée un nouvel utilisateur dans la base de données.

# Modifier un utilisateur

```
PUT /api/users/:id
```

Permet de modifier les informations d’un utilisateur.

# Supprimer un utilisateur

```
DELETE /api/users/:id
```

Supprime un utilisateur de la base.

# Login

```
POST /api/users/login
```

Exemple :

```
{
  "email": "sorayabellavoine@mail.com",
  "password": "123abc"
}
```

Cette route vérifie si l’utilisateur existe et si le mot de passe correspond.



#### Service "Orders" (port 5003)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/orders` | Lister toutes les commandes |
| GET | `/orders/{id}` | Détail d'une commande |
| POST | `/orders` | Créer une commande |
| GET | `/orders/user/{user_id}` | Commandes d'un utilisateur |
| GET | `/health` | Healthcheck |


#### Service "Products" (port 5002)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/products` | Lister tous les produits |
| GET | `/products/{id}` | Détail d'un produit |
| POST | `/products` | Créer un produit |
| PUT | `/products/{id}` | Modifier un produit |
| DELETE | `/products/{id}` | Supprimer un produit |
| GET | `/health` | Healthcheck |