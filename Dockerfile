# Matcher (validador KYC, Capa 1) — imagen para Google Cloud Run.
# Build context = raíz del monorepo (el matcher depende de packages/sdk y packages/shared
# vía npm workspaces). El .dockerignore excluye node_modules/dist/.env/modelos.
FROM node:20-slim

# tfjs-node usa OpenMP (libgomp1) en runtime; sharp y tfjs-node traen binarios prebuilt
# (glibc), así que no hace falta toolchain de compilación.
RUN apt-get update \
  && apt-get install -y --no-install-recommends libgomp1 ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instala el workspace completo (como en Render). Clean install para binarios linux-x64.
COPY . .
RUN npm install --no-audit --no-fund

# Descarga los pesos de face-api a una ruta fija (usada también en runtime).
ENV FACE_MODELS_PATH=/app/identity/issuer/matcher/models
RUN npm run download-models --workspace @behuman/issuer

ENV NODE_ENV=production
# Cloud Run inyecta $PORT (8080 por defecto); el server ya lo respeta.
WORKDIR /app/identity/issuer
CMD ["npm", "run", "serve"]
