# Projet Docker — "GitLab DevOps Platform"

## Déployer et configurer une plateforme GitLab complète en local

---

## Contexte

Vous êtes une équipe de 2 DevOps. Votre entreprise souhaite migrer vers une solution GitLab **auto-hébergée** pour avoir le contrôle total de son code et de ses pipelines CI/CD.

Votre mission : déployer une **stack GitLab complète** avec Docker, la configurer, et démontrer un pipeline CI/CD fonctionnel.

> **Durée** : 4h
> **Binôme** : Étudiant A + Étudiant B
> **Stack** : GitLab CE, GitLab Runner, Registry Docker

---

## Architecture cible

```
┌─────────────────────────────────────────────────────┐
│                    DÉVELOPPEUR                      │
│                         │                           │
│                         ▼                           │
│              ┌──────────────────┐                   │
│              │   GitLab CE      │ :80, :443, :22    │
│              │   (serveur Git)  │                   │
│              └────────┬─────────┘                   │
│                       │                             │
│         ┌─────────────┼─────────────┐               │
│         ▼             ▼             ▼               │
│  ┌────────────┐ ┌───────────┐ ┌──────────────┐      │
│  │  Runner 1  │ │  Runner 2 │ │Docker Registry│     │
│  │  (Docker)  │ │  (Shell)  │ │     :5050     │     │
│  └────────────┘ └───────────┘ └──────────────┘      │
│                                                     │
│  PostgreSQL (BDD GitLab)                            │
│  Redis (Cache)                                      │
│                                                     │
│  Volumes persistants : gitlab-data, runner-config   │
└─────────────────────────────────────────────────────┘
```

---

## Répartition du travail

### Étudiant A — Infrastructure GitLab

**Responsabilités** :

1. **Déploiement de GitLab CE**
   - docker-compose.yml avec GitLab CE
   - Configuration des volumes persistants
   - Configuration initiale (email, URL, etc.)
   - Accès à l'interface web

2. **Configuration GitLab**
   - Créer un compte admin
   - Créer un groupe "demo"
   - Créer un projet "demo-app"
   - Configurer les variables CI/CD
   - Activer le Container Registry

3. **PostgreSQL**
   - Base de données PostgreSQL pour GitLab
   - Volumes persistants

**Livrables** :
- GitLab accessible sur http://localhost
- Projet Git créé avec au moins 1 commit
- Container Registry fonctionnel

---

### Étudiant B — CI/CD Pipeline & Runners

**Responsabilités** :

1. **GitLab Runners**
   - Déployer 2 runners :
     * Runner Docker (executor: docker)
     * Runner Shell (executor: shell)
   - Enregistrer les runners dans GitLab
   - Configurer les tags (docker, shell)
   - Vérifier que les runners sont actifs

2. **Application de démonstration**
   - Créer une petite application (API Python/Node)
   - Écrire un Dockerfile multi-stage
   - Écrire un test unitaire

3. **Pipeline CI/CD (.gitlab-ci.yml)**
   - Stage 1 : Test (lancer les tests unitaires)
   - Stage 2 : Build (construire l'image Docker)
   - Stage 3 : Push (pousser vers le Registry GitLab)
   - Stage 4 : Deploy (déployer localement)

**Livrables** :
- 2 runners enregistrés et actifs
- Pipeline qui s'exécute automatiquement à chaque commit
- Image Docker disponible dans le Registry GitLab

---

## Exigences techniques

### compose.yaml

Doit contenir au minimum :
- **gitlab** (service principal)
- **postgresql** (base de données)
- **gitlab-runner-docker** (executor Docker)
- **gitlab-runner-shell** (executor Shell)

Contraintes :
- Volumes nommés pour la persistance
- Variables d'environnement via `.env`
- Réseau Docker dédié
- GitLab accessible sur port 80 (HTTP) et 22 (SSH)
- Registry sur port 5050

### GitLab Runner

Chaque runner doit :
- Être enregistré automatiquement via `gitlab-runner register`
- Avoir un tag spécifique (docker, shell)
- Être visible dans GitLab UI (Settings > CI/CD > Runners)

### Pipeline CI/CD

Le fichier `.gitlab-ci.yml` doit contenir :

```yaml
stages:
  - test
  - build
  - push
  - deploy

test:
  stage: test
  # À compléter

build:
  stage: build
  # À compléter

push:
  stage: push
  # À compléter

deploy:
  stage: deploy
  # À compléter
```

---

## 🧪 Scénario de démonstration attendu

### Partie 1 : Démarrage de la stack

```bash
# Lancer toute la plateforme
docker compose up -d

# Vérifier que GitLab est up (peut prendre 2-3 minutes)
docker compose logs -f gitlab

# Accéder à GitLab
http://localhost
```

### Partie 2 : Configuration initiale

1. Se connecter avec le compte root
2. Montrer le projet créé
3. Montrer les 2 runners actifs dans Settings > CI/CD > Runners

### Partie 3 : Pipeline CI/CD

1. Faire un commit/push dans le projet demo-app
2. Montrer le pipeline qui se lance automatiquement
3. Montrer les 4 stages qui passent au vert
4. Montrer l'image Docker dans le Container Registry
5. Montrer l'application déployée (container qui tourne)

### Partie 4 : Résilience

1. `docker compose restart gitlab`
2. Vérifier que les données persistent (projet toujours là)
3. Vérifier que les runners se reconnectent automatiquement

---

## 🌟 Bonus

| Bonus | Points |
|---|---|
| HTTPS avec certificat auto-signé | +1 |
| Monitoring GitLab (Prometheus + Grafana) | +2 |
| Pipeline avec environnements (dev, staging, prod) | +1 |
| Backup automatique de GitLab | +1 |
| Intégration Mattermost ou Slack pour notifications | +1 |
| Multi-project pipeline (déployer plusieurs apps) | +1 |
| Security scanning dans le pipeline (SAST/Dependency scanning) | +1 |

---

## 📦 Rendu

- **Repo Git** avec tout le code source
- **docker-compose.yml** fonctionnel
- **README.md** avec :
  - Instructions de démarrage
  - Credentials par défaut
  - URLs d'accès (GitLab, Registry)
- **Schéma d'architecture**
- **Guide de configuration** étape par étape
- **Démonstration live** du pipeline qui tourne

---

## 💡 Conseils

### Ressources mémoire

GitLab CE nécessite au minimum **4 GB de RAM**. Configurez dans le docker-compose.yml :

```yaml
gitlab:
  shm_size: '256m'
  # Limiter la RAM si nécessaire
  mem_limit: 4g
```

### Premiers pas avec GitLab

- Le premier démarrage prend 2-3 minutes
- Le mot de passe root initial se trouve dans `/etc/gitlab/initial_root_password` (dans le conteneur)
- L'URL par défaut doit être configurée dans `gitlab.rb`

### Registration Token

Pour enregistrer les runners, vous aurez besoin du **registration token** disponible dans :
`Settings > CI/CD > Runners > Specific runners`