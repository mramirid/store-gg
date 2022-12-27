# StoreGG

A web app that lets gamers to top up or buy voucher games.

> A course project from [BWA Full-Stack JavaScript Developer 2021: Website Top Up Voucher Game](https://buildwithangga.com/kelas/full-stack-javascript-developer-2021-website-top-up-voucher-game) with massive customizations.

## How to Run

### Initial Run

Do the following steps to populate the database with some initial documents; to populate the public images directory with some initial images; and to run all services.

1. Run the back-end and data seeding services.

```bash
docker compose -f ./backend/docker-compose.yaml --profile initial-run up -d --build
```

2. Make sure backend-express service has been running properly.

3. Build & start the client service.

```bash
cd ./client
```

```bash
npm ci
```

```bash
npm run build
```

```bash
npm start
```

### Run

Just run without data seeding.

1. Run the back-end services

```bash
docker-compose -f ./backend/docker-compose.yaml --profile run up -d
```

2. Start the client service.

```bash
cd ./client
```

```bash
npm start
```

### Running Ports

| Service             | Port  |
| ------------------- | ----- |
| Client: Next.js     | 8080  |
| Backend: Express.js | 3000  |
| Backend: MongoDB    | 27017 |

### RESTful API Documentation

See [Client API Documentation](https://documenter.getpostman.com/view/9718150/2s8YzUwLxF).
