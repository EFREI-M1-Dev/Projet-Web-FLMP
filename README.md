# Projet-Web-FLMP

<img src="./assets/screen.png" />

## Groupe

Membres du Groupe 6 :

- Florent PARIS
- Louis LUBINEAU
- Mattéo VECCHIONNE
- Pierre VIPREY

Lien du rapport : [Lien](study.md)

### Executer le projet en local
```sh
docker compose -f "docker-compose.yml" up -d postgres redis

cd back
npx prisma migrate dev
npm run start:dev

cd front
npm run dev
```

```sh
docker compose -f "docker-compose.yml" up -d --build postgres server redis
```
