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