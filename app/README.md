# Application mobile Lissafi-P

Projet mobile React Native avec Expo et TypeScript.

## Démarrage

```bash
npm install
npm run start
```

## Configuration

Copier `.env.example` vers `.env` et ajuster l'URL de l'API si nécessaire :

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## Structure

- `src/api/` : client HTTP centralisé.
- `src/auth/` : contexte et logique d'authentification.
- `src/navigation/` : flow onboarding/auth et tabs principales.
- `src/features/` : domaines fonctionnels de l'application.
