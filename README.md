# app-suivis-de-recouvrement

## Présentation

Ce projet est une application de suivi de recouvrement. Elle aide les utilisateurs à gérer, suivre et piloter efficacement les activités de recouvrement.

## Fonctionnalités

- **Suivi des dossiers de recouvrement** : Visualisation, recherche et gestion des dossiers clients en phase de recouvrement.
- **Gestion des statuts de paiement** : Suivi de l’avancement des paiements, changements de statuts (payé, en attente, impayé, etc.).
- **Historique des actions et communications** : Journalisation de toutes les actions réalisées sur chaque dossier (appels, visites, lettres, relances, etc.).
- **Génération de rapports d’avancement** : Création de rapports sur l’état du recouvrement pour analyse ou export.
- **Gestion des comptes clients** : Affichage, filtrage et recherche des comptes à recouvrer.
- **Gestion des comptes rendus** : Saisie et consultation des comptes rendus de suivi, appréciations et motifs d’impayé.
- **Historique des comptes rendus** : Accès à la liste et au détail des anciens comptes rendus pour chaque client.
- **Gestion des contacts associés** : Suivi des coordonnées et des changements de contacts des clients.
- **Gestion des motifs d’impayé** : Sélection et gestion des causes d’impayé (salaire suspendu, client injoignable, etc.).
- **Gestion des moyens de relance** : Choix du moyen de relance (appel, visite, lettre, sommation, etc.).
- **Gestion des types de clients** : Classification selon le comportement (coopérant, agressif, normal, etc.).
- **Gestion des utilisateurs/admins** : Connexion par matricule et mot de passe, droits d’accès et restrictions.
- **Filtrage, recherche et tri avancés** : Sur les dossiers, comptes, historiques, fichiers et comptes rendus.
- **Gestion des fichiers et pièces jointes** : Consultation et gestion de fichiers liés aux dossiers.
- **Interface de visualisation et de saisie rapide** : Tableaux interactifs pour les dossiers, comptes, historiques et fichiers.
- **Sécurité des accès** : Redirection automatique si accès non autorisé à certains modules.

Tu peux reprendre cette liste pour enrichir la section "Fonctionnalités" de ton README ou demander une reformulation ou une version plus synthétique si besoin !

## Accès administrateur (par défaut)

- **Matricule** : `1802`
- **Mot de passe** : `123`

> Pour vous connecter en tant qu’administrateur lors de la première utilisation, utilisez l’identifiant et le mot de passe ci-dessus.

## Prise en main

### Prérequis

- [Node.js](https://nodejs.org/) (si l’application fonctionne avec Node.js)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (si applicable)
- Autres dépendances spécifiques à votre stack

### Installation

Clonez le dépôt :

```bash
git clone https://github.com/ChedlyRebai/app-suivis-de-recouvrement.git
cd app-suivis-de-recouvrement
```

Installez les dépendances :

```bash
npm install
# ou
yarn install
```

### Lancement

Démarrez le serveur de développement :

```bash
npm start
# ou
yarn start
```

Rendez-vous sur `http://localhost:3000` dans votre navigateur (ajustez le port si nécessaire).

## Structure du projet

```
.
├── src/           # Code source principal de l’application
├── public/        # Fichiers statiques
├── README.md      # Documentation du projet
├── package.json   # Dépendances et scripts
└── ...
```

## Contribution

Les contributions sont les bienvenues ! Merci d’ouvrir une issue ou une pull request avec vos suggestions ou améliorations.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d’informations.

## Contact

Pour toute question ou assistance, contactez [Chedly Rebai](https://github.com/ChedlyRebai).
