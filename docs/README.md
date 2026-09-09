# TERADEV — Site vitrine

Page d'accueil institutionnelle du cabinet TERADEV
**Planifier – Transformer – Impacter.**

Ce document décrit l'implémentation du site. Pour l'installation et le
lancement, voir [INSTALLATION.md](./INSTALLATION.md).

---

## 1. Présentation

Terminale publique de présentation du cabinet TERADEV, un cabinet
d'ingénierie et de conseil dédié au développement des territoires
résilients, inclusifs et durables. Le site est une application React
mono-page (SPA) entièrement en français.

## 2. Stack technique

| Technologie | Rôle |
|---|---|
| **React 19** | Interface utilisateur (JSX, sans TypeScript) |
| **Vite 8** | Serveur de développement, build et bundling |
| **Tailwind CSS v4** | Styles utilitaires + thème via `@theme` |
| **AOS 2.3 (Animate On Scroll)** | Animations d'apparition au scroll |
| **Docker / nginx** | Conteneurisation et déploiement avec HTTPS |

## 3. Structure du projet

```
TERADEV/
├── index.html              # Entrée HTML (polices Google, titre, mount #root)
├── vite.config.js          # Config Vite (plugin React + Tailwind, host)
├── package.json            # Dépendances et scripts npm
├── eslint.config.js        # Règles ESLint (react-hooks, react-refresh)
├── Dockerfile              # Build multi-étapes → nginx (production)
├── Dockerfile.dev          # Image de développement (dev server)
├── docker-compose.yml      # frontend (dev) + nginx (HTTPS, teradev.local)
├── nginx/default.conf      # Redirection 80→443, proxy vers le dev server
├── certs/                  # Certificats SSL locaux (teradev.local)
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/robot-globe.jpg   # Image de fond du hero
└── src/
    ├── main.jsx            # Point d'entrée React (StrictMode)
    ├── App.jsx             # Contenu et logique du site (Mon composant unique)
    └── index.css           # Thème Tailwind + classes custom et animations
```

## 4. Sections du site

| # | Section | Contenu |
|---|---|---|
| — | **Header fixe** | Logo TERA**DEV**, navigation, bouton « Nous contacter ». Transparent sur le hero, passe en `bg-dark` flouté au scroll (> 30px) |
| — | **Menu mobile/tablette** | Burger à droite (< 1024px). Panneau défilant depuis la droite : pleine hauteur, **90 % de largeur** (max 420px), liens + CTA |
| 1 | **Hero** | Slogan « PLANIFIER. TRANSFORMER. IMPACTER. », signature TERADEV, bouton « Demander une expertise », image robot-globe + grille, guide de défilement |
| 2 | **Le cabinet** | Présentation du cabinet + 3 engagements : **Résilience**, **Inclusion**, **Durabilité** |
| 3 | **Pôles d'expertise** | Grille sombre des 8 pôles : Aménagement du territoire, SIG & Géomatique, Environnement et climat, Gestion de projets, Formation, Assistance technique, Recherche et données, Foncier et urbanisme |
| 4 | **Notre méthode** | 3 étapes : Planifier / Transformer / Impacter |
| 5 | **Nos partenaires** | Carrousel horizontal de partenaires fictifs, défilement automatique infini + chevrons de contrôle |
| 6 | **Chiffres clés** | 4 statistiques à compteur animé : 150+ projets, 2M+ utilisateurs, 40+ experts, 12 pays |
| 7 | **Contact / CTA** | Bloc arrondi sombre, « Construisons ensemble des territoires durables », mailto « Nous contacter » |
| — | **Footer** | Logo, signature, navigation, coordonnées (Ouagadougou, Burkina Faso), copyright |

## 5. Fonctionnalités & animations

**Décor de bulles (`BubbleField`)**
- 10 bulles floutées (vert/teal/sauge) qui montent lentement
  (keyframes `bubble-rise`, 16–34 s, dérive latérale + zoom).
- Présent dans les sections claires : Le cabinet, Notre méthode,
  Chiffres clés. Respecte `prefers-reduced-motion`.

**Animations au scroll (AOS)**
- Initialisé avec `once: true`, durée 800 ms, easing `ease-out-cubic`.
- Animations `fade-up` (avec délais progressifs) sur les titres, cartes,
  rangées et conteneurs.

**Cartes à survol (`card-lift`)**
- Levée de 10 px + ombre portée, zoom du fond image (Ken Burns),
  icône qui se soulève/pivote, flèche ↗ qui apparaît (courbe
  `cubic-bezier(0.22,0.68,0.25,1)`).

**Carrousel partenaires (`PartnersSlider`)**
- Piste scrollable horizontale, liste dupliquée pour une **boucle
  infinie** (reset invisible à la moitié).
- **Autoplay** via `requestAnimationFrame` (0.6 px/image).
- **Pause** au survol, au toucher ou pendant 4 s après un clic sur chevron.
- Chevrons ‹ › désactivés aux extrémités ; scrollbar masquée ; réduit
  pour `prefers-reduced-motion`.

**Compteurs animés (`Counter`)**
- Déclenchés par `IntersectionObserver` (threshold 0.3), easing
  `easeOutCubic` sur 1,6 s. Falls back si IO absent ou motion réduite.

**Header intelligent**
- `fixed`, écoute du scroll (`window.scrollY > 30`) pour basculer entre
  `transparent` et `bg-dark/95` + `backdrop-blur` + ombre.

## 6. Thème & identité

Défini dans `src/index.css` via `@theme` (Tailwind v4) :

| Token | Valeur | Usage |
|---|---|---|
| `bg` | `#e8ece7` | Fond clair des sections |
| `ink` | `#112d34` | Texte principal |
| `muted` | `#748286` | Texte secondaire |
| `green` | `#a5cd48` | Accent (vert pomme) |
| `green2` | `#7fae35` | Accent secondaire |
| `dark` | `#0c2931` | Sections sombres |

Typographies : **DM Sans** (corps) et **Space Grotesk** (titres, display),
chargées depuis Google Fonts dans `index.html`.

Classes custom : `hero-grid-pattern`, `hero-overlay-gradient`,
`fake-farm-bg`, `bubbles`/`bubble`, `no-scrollbar`, `card-lift`
(+ `card-bg`, `card-icon`, `card-arrow`), `contact-glow`,
`brand-icon-wrap` (logo feuille en CSS pur).

## 7. Qualité

- `npm run lint` — ESLint (react-hooks + react-refresh, `dist` ignoré).
- `npm run build` — build de production Vite (sortie `dist/`).
- Fichier `index.html` : `lang="fr"`, titre « TERADEV — Planifier. Transformer. Impacter. »