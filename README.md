# Oh My Travels

> Full-stack AI-assisted travel planner with a React 19 frontend, Node.js microservices, MongoDB, and the Gemini API.

![Context](https://img.shields.io/badge/Context-BUT%202%20(S4)-2ea44f?style=flat-square)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)

## Overview

**Oh My Travels** is a second-year Computer Science (BUT 2 — S4) full-stack application designed to help users search, plan, and save travel itineraries. It combines a **React + Material UI** frontend with a **microservices backend** featuring JWT authentication, AI recommendations powered by the **Google Gemini API**, destination photos via **Pexels**, and live weather forecasts via **Open-Meteo**.

## Features

- **Travel search & AI recommendations** generated via the Google Gemini API.
- **Live weather forecasts & destination photos** powered by Open-Meteo and Pexels.
- **User accounts & saved itineraries** persisted in MongoDB.
- **API Gateway** with JWT authentication and reverse-proxy routing.
- **Interactive Swagger / OpenAPI documentation** auto-generated for microservices.
- **Automated unit & integration tests** for the `travels` service (`node --test`, `supertest`, `mongodb-memory-server`).

## Tech Stack

- **Frontend**: React 19, Vite, React Router, Material UI (MUI), Swiper
- **Backend**: Node.js, Express 5, `http-proxy-middleware`, JWT, AJV, Swagger UI
- **AI & External APIs**: Google Gemini API, Open-Meteo, Pexels, IPinfo
- **Database & Containers**: MongoDB (Mongoose), Docker / Podman Compose, `Containerfile`

## Project Structure

```text
├── database/
│   ├── compose.yml                     # MongoDB & Mongo Express setup
│   └── pods.sh
├── microservices/
│   ├── gateway/                        # API Gateway & JWT middleware (port 3002)
│   ├── travels/                        # Travel itineraries, Gemini API & tests (port 3003)
│   ├── users/                          # User authentication & persistence
│   └── tools/                          # Utility service (weather, photos, geolocation)
└── ohmytravels/                        # React + Vite frontend
    └── src/
        ├── components/                 # Weather, recommendation, link & result cards
        ├── pages/                      # Home, Search, Results & Saved Searches
        └── styles/
```

## Getting Started

1. **Start MongoDB**:
   ```bash
   cd database && docker compose up -d
   ```
2. **Configure environment variables** by copying each `.env.example` to `.env` and filling in your keys:
   ```bash
   cp microservices/gateway/.env.example microservices/gateway/.env
   cp microservices/users/.env.example microservices/users/.env
   cp microservices/travels/.env.example microservices/travels/.env
   cp microservices/tools/.env.example microservices/tools/.env
   cp ohmytravels/.env.example ohmytravels/.env
   ```
3. **Install dependencies and start each microservice**:
   ```bash
   cd microservices/<service>
   npm install
   npm start
   ```
4. **Run the React frontend**:
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