#!/usr/bin/env bash
# Despliega el matcher (validador KYC, Capa 1) a Google Cloud Run desde el repo LOCAL
# (--source .). Requiere `gcloud auth login` previo y billing habilitado en el proyecto.
#
# Uso: scripts/deploy-matcher-cloudrun.sh [PROJECT_ID]
#   REGION=us-central1  (override con env)
#   DEDUP_PEPPER=...    (si no, genera uno nuevo)
set -euo pipefail

PROJECT="${1:-${GCP_PROJECT:-vaulted-hawk-492601-e1}}"
REGION="${REGION:-us-central1}"
SERVICE="${SERVICE:-human-matcher}"
PEPPER="${DEDUP_PEPPER:-$(openssl rand -hex 24)}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Proyecto: $PROJECT  Región: $REGION  Servicio: $SERVICE"
gcloud config set project "$PROJECT" >/dev/null

echo "==> Habilitando APIs (run, cloudbuild, artifactregistry)"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

echo "==> Deploy a Cloud Run (build con Cloud Build desde el Dockerfile raíz)"
gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --memory 2Gi --cpu 1 --concurrency 1 --timeout 300 \
  --min-instances 0 --max-instances 3 \
  --allow-unauthenticated \
  --set-env-vars "IDENTITY_PROVIDER=testnet,MATCH_THRESHOLD=0.6,CORS_ORIGIN=*,FACE_MODELS_PATH=/app/identity/issuer/matcher/models,DEDUP_PEPPER=${PEPPER}"

URL="$(gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)')"
echo ""
echo "MATCHER_URL=$URL"
echo "(apuntá VITE_MATCHER_URL de Vercel a esta URL y redeploy)"
