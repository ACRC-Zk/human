#!/usr/bin/env bash
# Despliega el contrato kyc_verifier a la testnet de Stellar. STUB.
# 📐 Ver `Setup del Entorno` y `Contrato Verificador (Soroban)` en la vault.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Compilando contrato"
# (cd contracts && stellar contract build)

echo "==> Desplegando a testnet"
# stellar contract deploy \
#   --wasm contracts/target/wasm32-unknown-unknown/release/kyc_verifier.wasm \
#   --source "$STELLAR_SOURCE_ACCOUNT" \
#   --network testnet

echo "STUB: implementar deploy. Cargar variables desde .env (ver .env.example)."
