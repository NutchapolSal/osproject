# candy rotator game

## Running

- download `prod-docker-compose.yaml`
- rename to `docker-compose.yaml`
- replace variables' values inside
- run `docker compose up -d`

## Developing

- clone this repository
- run `npm i`
- copy `dev-docker-compose.yaml` to `docker-compose.yaml`
- copy `dev.env` to `.env`
- edit variables inside `docker-compose.yaml` and `.env`
- run `docker compose up -d` to start postgres database

### run development server
```bash
npm run dev
```

## Building
### locally
```bash
npm run build
```
then preview the production build
```bash
npm run preview
```

### docker image
```bash
docker build .
```