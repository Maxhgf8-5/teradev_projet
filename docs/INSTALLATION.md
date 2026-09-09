# TERADEV — Installation & lancement

Guide pour installer, lancer et déployer le site vitrine TERADEV.

Pour la description du projet et de ce qui a été implémenté, voir
[README.md](./README.md).

---

## 1. Prérequis

- **Node.js ≥ 22** (utilisé : `node:22-alpine` dans les images Docker)
- **npm** (livré avec Node.js)
- Facultatif : **Docker** et **Docker Compose** pour le déploiement conteneurisé

Vérifier la version :

```bash
node --version   # v22.x ou plus
npm --version
```

## 2. Installation des dépendances

```bash
npm install
```

Les dépendances principales :
`react`, `react-dom`, `tailwindcss`, `@tailwindcss/vite`, `aos`.

## 3. Lancement en développement

```bash
npm run dev
```

Serveur de développement Vite accessible sur :
**http://localhost:5173**

- Hot Module Replacement (HMR) activé.
- Le serveur écoute aussi sur `0.0.0.0` et accepte l'hôte
  `teradev.local` (configuré dans `vite.config.js`).

> Sous PowerShell (Windows), si `npm` est bloqué par la politique
> d'exécution des scripts, utiliser `npm.cmd run dev`.

## 4. Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement (HMR) |
| `npm run build` | Build de production vers `dist/` |
| `npm run preview` | Prévisualisation du build (`dist/`) |
| `npm run lint` | Lint ESLint (react-hooks, react-refresh) |

Aperçu du build de production :

```bash
npm run build
npm run preview   # http://localhost:4173
```

## 5. Déploiement avec Docker

Deux images sont disponibles :

### a) Image de production (`Dockerfile`)

Build multi-étapes : compilation Vite puis serveur nginx.

```bash
docker build -t teradev .
docker run -p 8080:80 teradev
# http://localhost:8080
```

### b) Stack complète avec HTTPS (`docker-compose.yml`)

Le compose lance :
- `frontend` : serveur de dev Vite (`Dockerfile.dev`, port exposé 5173),
- `nginx` : reverse-proxy avec SSL, redirection 80 → 443, proxy vers le
  serveur dev, et certificats locaux depuis `certs/`.

```bash
docker compose up -d
```

Pour utiliser **https://teradev.local** :

1. Ajouter l'hôte dans le fichier `hosts` du système :
   - Windows : `C:\Windows\System32\drivers\etc\hosts`
   - Linux/macOS : `/etc/hosts`

   ```
   127.0.0.1  teradev.local
   ```

2. Vérifier que les certificats existent dans `certs/` :
   `teradev.local.pem` et `teradev.local-key.pem`
3. Accéder à **https://teradev.local** (redirection automatique du port 80).

### Configuration nginx (`nginx/default.conf`)

- Écoute sur les ports 80 (redirection HTTPS) et 443 (SSL).
- Certificats montés depuis `certs/`.
- `location /` → `proxy_pass http://frontend:5173` avec les en-têtes
  proxy classiques et le support WebSocket (HMR).

## 6. Remarques

- Les scripts et le formatage sont adaptés à un environnement **Windows
  (PowerShell 5.1)**, mais restent compatibles Linux/macOS.
- Les coordonnées (email/téléphone/localisation) du footer et les liens
  `mailto:` sont des exemples à remplacer par les vraies données TERADEV.
- Les logos partenaires du carrousel sont **fictifs** (placeholders).