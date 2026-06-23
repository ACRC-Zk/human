#!/usr/bin/env bash
# Genera una prueba Groth16 de ejemplo a partir de un input.json. STUB.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Generando prueba de ejemplo"
# TODO: implementar con snarkjs
# node build/kyc_js/generate_witness.js build/kyc_js/kyc.wasm input.json build/witness.wtns
# snarkjs groth16 prove build/kyc_final.zkey build/witness.wtns build/proof.json build/public.json
# snarkjs groth16 verify build/verification_key.json build/public.json build/proof.json

echo "STUB: implementar generación de prueba. Ver 'Flujo de KYC' (Fase 2) en la vault."
