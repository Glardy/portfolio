# Portfolio — Votre Nom

Portfolio professionnel bilingue (FR/EN) — Actuariat · Risk Management · Data Science

## Stack technique

- **React 19** + **Vite 8**
- **Tailwind CSS 3**
- **React Router v7** (HashRouter pour GitHub Pages)
- Rendu Markdown maison (sans dépendances)
- CMS intégré (localStorage)

## Lancer en développement

```bash
npm install
npm run dev
```

Le site sera accessible sur http://localhost:5173/portfolio/

## Build et déploiement

```bash
npm run build      # génère le dossier dist/
npm run deploy     # build + push vers GitHub Pages
```

**Site live :** https://glardy.github.io/portfolio/

## Structure du projet

```
src/
├── App.jsx              # Shell, routes, toutes les pages
├── index.css            # Base Tailwind + Inter
├── main.jsx             # Entry point + HashRouter
├── components/
│   └── Markdown.jsx     # Rendu Markdown minimal
└── data/
    ├── projects.js      # Données projets + helpers localStorage
    └── posts.js         # Données articles + helpers localStorage
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/portfolio` | Liste des projets |
| `/portfolio/:slug` | Détail d'un projet |
| `/blog` | Liste des articles (recherche + filtres) |
| `/blog/:slug` | Détail d'un article |
| `/page_secrete` | Formulaire privé de témoignages |
| `/contact` | Formulaire de contact |
| `/admin` | Interface d'administration (protégée) |

## Interface admin

Accédez à `/admin` sur le site (local ou en ligne).

**Mot de passe par défaut :** `portfolio2026`
> ⚠️ Changez-le dans `src/App.jsx` (`ADMIN_PASSWORD`) avant de déployer en production.

L'admin permet de :
- **Créer, modifier, supprimer** des projets et des articles
- **Créer, modérer et publier** des témoignages
- **Publier / mettre en brouillon** chaque élément
- **Rédiger le contenu en Markdown** (FR et EN simultanément)

Les données sont sauvegardées dans le `localStorage` du navigateur.
Pour persister les contenus de façon permanente, reportez les modifications
dans `src/data/projects.js` et `src/data/posts.js`.

## Personnalisation

1. **Nom et infos** : chercher `Votre Nom` dans `App.jsx` et `data/*.js`
2. **Contenus** : modifier `src/data/projects.js` et `src/data/posts.js`
3. **Couleurs** : modifier les classes Tailwind dans `App.jsx`
4. **Mot de passe admin** : modifier `ADMIN_PASSWORD` dans `App.jsx`
