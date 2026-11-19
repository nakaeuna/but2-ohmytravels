# Oh My Travels

> Full-stack AI-assisted travel planner with a React 19 frontend, Node.js microservices, MongoDB, and the Gemini API.

![Context](https://img.shields.io/badge/Context-BUT%202-2ea44f?style=flat-square)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)

## Overview

**Oh My Travels** is a full-stack web application that helps users search, plan, and save travel itineraries. It pairs a **React and Material UI** frontend with a **Node.js microservices** backend featuring JWT authentication, AI travel suggestions from the **Google Gemini API**, destination photos from **Pexels**, and live weather from **Open-Meteo**.

## Features

- **Travel search and AI recommendations:** Generates structured travel suggestions using the Google Gemini API.
- **Live weather and destination photos:** Fetches current weather via Open-Meteo and city photos via Pexels.
- **User accounts and saved itineraries:** Persists accounts and saved trips in MongoDB.
- **API Gateway:** Handles JWT authentication and reverse-proxy routing across microservices.
- **OpenAPI documentation:** Generates interactive Swagger documentation for backend services.
- **Automated tests:** Includes unit and integration tests for the `travels` service (`node --test`, `supertest`, `mongodb-memory-server`).

## Technology Stack

- **Frontend:** React 19, Vite, React Router, Material UI, Swiper
- **Backend:** Node.js, Express 5, `http-proxy-middleware`, JWT, AJV, Swagger UI
- **External APIs:** Google Gemini API, Open-Meteo, Pexels, IPinfo
- **Database and Containers:** MongoDB, Mongoose, Docker Compose, Podman

## Project Structure

```text
├── database/
│   ├── compose.yml                     # MongoDB and Mongo Express setup
│   └── pods.sh
├── microservices/
│   ├── gateway/                        # API Gateway and JWT middleware (port 3002)
│   ├── travels/                        # Travel itineraries, Gemini API, and tests (port 3003)
│   ├── users/                          # User authentication and persistence
│   └── tools/                          # Utility service (weather, photos, geolocation)
└── ohmytravels/                        # React and Vite frontend
    └── src/
        ├── components/                 # Weather, recommendation, link, and result cards
        ├── pages/                      # Home, Search, Results, and Saved Searches
        └── styles/
```

## Getting Started

1. **Start MongoDB:**
   ```bash
   cd database && docker compose up -d
   ```
2. **Create environment files** by copying each `.env.example` to `.env` and filling in your keys:
   ```bash
   cp microservices/gateway/.env.example microservices/gateway/.env
   cp microservices/users/.env.example microservices/users/.env
   cp microservices/travels/.env.example microservices/travels/.env
   cp microservices/tools/.env.example microservices/tools/.env
   cp ohmytravels/.env.example ohmytravels/.env
   ```
3. **Install dependencies and start each microservice:**
   ```bash
   cd microservices/<service>
   npm install
   npm start
   ```
4. **Run the React frontend:**
   ```bash
   cd ohmytravels
   npm install
   npm run dev
   ```
5. **Run backend tests** (`travels` service):
   ```bash
   cd microservices/travels
   npm test
   ```

## License

All Rights Reserved. See [`LICENSE`](LICENSE) for details. No commercial use, modification, or redistribution is allowed without written permission.