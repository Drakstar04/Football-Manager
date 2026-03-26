# Football Manager App

Une application mobile développée en **React Native** et **Expo** permettant de suivre les matchs de football en direct, de consulter les rencontres à venir, et de simuler des matchs en temps réel.

## Fonctionnalités

- **Liste des matchs en direct :** Affichage interactif des scores et du temps de jeu avec un design soigné (dégradés et filigranes).
- **Filtre par ligue :** Navigation fluide entre différentes ligues (Ligue des Champions, Premier League, La Liga, Serie A, Ligue 1).
- **Matchs à venir :** Consultation rapide des prochaines rencontres (équipes, dates, heures et stades).
- **Simulateur de match :** Un écran dédié permettant de lancer la simulation d'une rencontre. Le chronomètre défile et les buts sont générés aléatoirement avec un affichage du score mis à jour en temps réel.
- **Navigation personnalisée :** Utilisation de `React Navigation` (Stack & Bottom Tabs) pour une expérience utilisateur native et intuitive, incluant un bouton central mis en valeur.

## Technologies utilisées

- React Native
- Expo
- React Navigation (Bottom Tabs & Native Stack)
- Expo Linear Gradient
- Expo Vector Icons (Ionicons)

## Installation et Lancement

Assurez-vous d'avoir Node.js installé sur votre machine.

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Drakstar04/Football-Manager.git
   cd footballManager
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application**
   ```bash
   npx expo start
   ```

4. **Tester l'application :**
   - Téléchargez l'application **Expo Go** sur votre téléphone (iOS ou Android).
   - Scannez le QR code affiché dans le terminal ou dans l'interface web d'Expo.
   - Vous pouvez également appuyer sur `a` pour lancer sur un émulateur Android ou `i` pour un simulateur iOS.

## Licence

Ce projet est créé à des fins de démonstration et d'apprentissage.
