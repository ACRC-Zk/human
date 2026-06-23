#!/usr/bin/env bash
# Demo end-to-end de beHuman (lo que graba el video del hackathon). STUB.
# Flujo completo: issuer → credencial → prueba ZK → verify_and_register → is_verified.
# 📐 Ver `Flujo de KYC` y `Plan de Demo` en la vault.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> [1/5] Issuer firma una credencial de prueba"
echo "==> [2/5] Cliente genera la prueba ZK (off-chain)"
echo "==> [3/5] verify_and_register en el contrato Soroban"
echo "==> [4/5] is_verified(address) -> true"
echo "==> [5/5] dApp consulta el registro y da acceso"

echo "STUB: implementar demo E2E encadenando issuer + sdk + contrato."
