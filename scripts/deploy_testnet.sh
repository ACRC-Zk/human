#!/usr/bin/env bash
# Despliega el contrato kyc_verifier a la testnet de Stellar.
# Crea/funda una identidad de deploy, compila y despliega. Imprime el contract id
# y lo guarda en .deploy/kyc_verifier.id.
# 📐 Ver `Setup del Entorno` y `Contrato Verificador (Soroban)` en la vault.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
[ -f "$ROOT/.env" ] && set -a && . "$ROOT/.env" && set +a || true

ACCOUNT="${STELLAR_DEPLOY_IDENTITY:-behuman-deployer}"
NETWORK="${STELLAR_NETWORK:-testnet}"

echo "==> Identidad de deploy: $ACCOUNT ($NETWORK)"
if ! stellar keys address "$ACCOUNT" >/dev/null 2>&1; then
  stellar keys generate "$ACCOUNT" --network "$NETWORK" --fund
else
  stellar keys fund "$ACCOUNT" --network "$NETWORK" >/dev/null 2>&1 || true
fi

echo "==> Compilando contrato (wasm)"
stellar contract build >/dev/null
WASM="target/wasm32v1-none/release/kyc_verifier.wasm"

echo "==> Desplegando $WASM"
CID="$(stellar contract deploy --wasm "$WASM" --source "$ACCOUNT" --network "$NETWORK")"

mkdir -p "$ROOT/.deploy"
echo "$CID" > "$ROOT/.deploy/kyc_verifier.id"
stellar keys show "$ACCOUNT" > "$ROOT/.deploy/deployer.secret" 2>/dev/null || true

echo ""
echo "KYC_VERIFIER_CONTRACT_ID=$CID"
echo "(guardado en .deploy/kyc_verifier.id)"
