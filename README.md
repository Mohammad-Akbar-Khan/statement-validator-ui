# Statement Validator UI

Standalone Angular frontend for the Trading Statement Validator. It collects an expected account number, account holder name, statement period, and a PDF/image file, then sends them to the Spring Boot API for the four-stage Vertex AI flow.

## Stack

- Angular 22, TypeScript
- Node.js 22.22.3+ (this workspace was scaffolded with Node 24)
- npm

## Run locally

Start the Spring Boot backend first at `http://localhost:8080`, then from this folder:

```powershell
npm install
npm start
```

Open `http://localhost:4200`. The Angular development server proxies `/api` requests to `http://localhost:8080` using `proxy.conf.json`.

The backend must accept these multipart form fields: `expectedAccount`, `expectedOwner`, `expectedPeriod`, and `file`. The current UI accepts PDF and image uploads up to 20 MB.

For a deployed setup, serve the Angular build behind the same domain or configure the backend URL and CORS policy for the UI origin. Do not put Vertex credentials in this frontend.

## Build

```powershell
npm run build
```

## Separate repositories

This frontend is maintained separately from the Spring Boot backend repository. The UI repository contains no Vertex credentials or uploaded statements.
