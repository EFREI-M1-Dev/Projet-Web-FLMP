# Projet-Web-FLMP

## Groupe

Membres du Groupe 6 :
- Florent PARIS
- Louis LUBINEAU
- Mattéo VECCHIONNE
- Pierre VIPREY
  
Lien du rapport : [Lien](study.md)

```sh
cd back
npx prisma migrate dev
npm run start:dev
docker compose  -f "docker-compose.yml" up -d --build postgres redis
# Shutdown
docker compose -f "docker-compose.yml" down
```