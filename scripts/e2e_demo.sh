#!/usr/bin/env bash
# Demo end-to-end de la Capa 1 en testnet:
#   identidad -> prueba ZK -> verify_and_register -> is_verified == true
#
# Requisitos previos (una vez):
#   npm install
#   (cd identity/circuits && npm install && bash scripts/compile.sh && POWER=13 bash scripts/setup.sh)
# 📐 Ver `Flujo de KYC` y `Plan de Demo` en la vault.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
[ -f "$ROOT/.env" ] && set -a && . "$ROOT/.env" && set +a || true

NETWORK="${STELLAR_NETWORK:-testnet}"
RPC_URL="${STELLAR_RPC_URL:-https://soroban-testnet.stellar.org}"
PASSPHRASE="${STELLAR_NETWORK_PASSPHRASE:-Test SDF Network ; September 2015}"

# 1) Deploy fresco (un contrato por demo: trusted_root se fija en init).
echo "==> [deploy] desplegando kyc_verifier"
bash "$ROOT/scripts/deploy_testnet.sh"
CONTRACT_ID="$(cat "$ROOT/.deploy/kyc_verifier.id")"
SIGNER_SECRET="$(cat "$ROOT/.deploy/deployer.secret")"

# 2) E2E (usa el mismo address fondeado como usuario del KYC).
echo "==> [e2e] corriendo el flujo on-chain"
CONTRACT_ID="$CONTRACT_ID" \
SIGNER_SECRET="$SIGNER_SECRET" \
RPC_URL="$RPC_URL" \
NETWORK_PASSPHRASE="$PASSPHRASE" \
  npx tsx "$ROOT/scripts/e2e.ts"
