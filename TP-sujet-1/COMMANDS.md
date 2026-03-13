# Commandes

```bash
# Je me place dans le dossier du projet
cd TP-sujet-1

# Je lance tous les conteneurs du projet (build + start)
docker compose up --build

# Je vérifie que les conteneurs tournent
docker ps

# Je teste que la gateway nginx fonctionne
curl http://localhost/health

# Je crée un utilisateur via l'API
curl -Method POST http://localhost/api/users -Headers @{ "Content-Type" = "application/json" } -Body '{"username":"john","email":"john@mail.com","password":"123"}'

# Je vérifie que l'utilisateur est bien enregistré
curl http://localhost/api/users

# Je récupère un utilisateur par son id
curl http://localhost/api/users/1

# Je teste la connexion utilisateur
curl -Method POST http://localhost/api/users/login -Headers @{ "Content-Type" = "application/json" } -Body '{"email":"john@mail.com","password":"123"}'

# Je modifie les informations d'un utilisateur
curl -Method PUT http://localhost/api/users/1 -Headers @{ "Content-Type" = "application/json" } -Body '{"username":"johnny","email":"johnny@mail.com"}'

# Je supprime un utilisateur
curl -Method DELETE http://localhost/api/users/1

# Je regarde les logs des services
docker compose logs

# Je regarde les logs du service users-api
docker compose logs users-api

# J'arrête tous les conteneurs
docker compose down

# Je supprime complètement les conteneurs et les volumes
docker compose down -v
```