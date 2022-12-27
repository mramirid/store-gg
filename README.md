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

2. Make sure the backend services have been running properly.

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
docker compose -f ./backend/docker-compose.yaml --profile run up -d
```

2. Build & start the client service.

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

### Running Ports

| Service             | Port  |
| ------------------- | ----- |
| Client: Next.js     | 8080  |
| Backend: Express.js | 3000  |
| Backend: MongoDB    | 27017 |

## User Interface Design

See [StoreGG Website UI Design](https://www.figma.com/file/b9bu3113aU4HDICwubZugs/StoreGG?node-id=0%3A1&t=xY3TZ8IVBgi4lGdV-1).

## Client Service

<img src="https://res.cloudinary.com/mramirid/image/upload/v1672134745/Client_Service_resized_hvqes6.jpg" alt="Screenshot" />

## Backend Service

### Admin Dashboard

The admin functionality is supported by a dashboard; rendered by the server using EJS templating engine.

### RESTful API Documentation

See [Client API Documentation](https://documenter.getpostman.com/view/9718150/2s8YzUwLxF).

## Techstack

Fullstack TypeScript MERN with Next.js:

- [TypeScript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript.
- [Next.js](https://nextjs.org/) - an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.
- [Bootstrap v5](https://getbootstrap.com/) - a free, open-source front-end framework that consists of CSS and JavaScript files and is used to create responsive, mobile-first websites and web applications.
- [MongoDB](https://www.mongodb.com/docs/) - a NoSQL database that uses a document-oriented model for storing and accessing data, which allows for flexible and scalable management of large datasets.
- [Node.js](https://nodejs.org/) - a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - a fast, unopinionated, and minimalist web framework for Node.js.
- [EJS](https://ejs.co/) - a simple templating language for generating HTML markup with plain JavaScript.
- [Admin LTE](https://adminlte.io/) - a source admin dashboard & control panel theme. Built on top of Bootstrap, AdminLTE provides a range of responsive, reusable, and commonly used components.
- [Docker](https://www.docker.com/) - an open platform for developing, shipping, and running applications.
