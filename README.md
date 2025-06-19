Ce projet est une [Next.js](https://nextjs.org) application bootstrappée avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Démarrage Rapide

Tout d'abord, lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

Vous pouvez commencer à éditer la page en modifiant `app/page.tsx`. La page se met à jour automatiquement lorsque vous éditez le fichier.

Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour optimiser et charger automatiquement [Inter](https://fonts.google.com/specimen/Inter), une police moderne pour les interfaces web.

## En Savoir Plus

Pour en savoir plus sur Next.js, consultez les ressources suivantes :

- [Documentation Next.js](https://nextjs.org/docs) - découvrez les fonctionnalités et l'API Next.js.
- [Apprendre Next.js](https://nextjs.org/learn) - un tutoriel interactif Next.js.

Vous pouvez consulter [le dépôt GitHub Next.js](https://github.com/vercel/next.js) - vos commentaires et contributions sont les bienvenus !

## Interface Panel INVIVO

Cette application présente une interface futuriste pour la gestion de :
- **Tableau de bord** : Vue d'ensemble avec notifications en temps réel
- **Chantiers** : Suivi des projets de construction
- **Entrepôts** : Gestion des stocks et inventaires  
- **Réunions** : Planning et organisation

### Fonctionnalités

- Interface moderne avec thème Material-UI personnalisé
- Navigation responsive avec dock latéral
- Données temps réel pour les chantiers et stocks
- Système d'alertes et notifications
- Cartes interactives avec animations fluides

### Structure du Projet

```
src/
├── app/
│   ├── components/     # Composants réutilisables
│   ├── context/       # Contextes React
│   ├── chantiers/     # Page gestion chantiers
│   ├── entrepots/     # Page gestion entrepôts
│   ├── reunions/      # Page gestion réunions
│   └── page.tsx       # Page d'accueil
```

## Déploiement Local

Pour construire et démarrer l'application en mode production :

```bash
npm run build
npm run start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).
