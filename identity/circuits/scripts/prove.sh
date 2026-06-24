#!/usr/bin/env bash
# Genera una prueba Groth16 de ejemplo a partir de input.json y la verifica con snarkjs.
#
# Requiere haber corrido antes: compile.sh y setup.sh.
# El input.json se genera con `node scripts/gen_input.mjs` (ver ese archivo).
set -euo pipefail

cd "$(dirname "$0")/.."
INPUT="${INPUT:-input.json}"

if [ ! -f "$INPUT" ]; then
  echo "ERROR: falta $INPUT. Generalo con: node scripts/gen_input.mjs <addressHashDecimal>"
  exit 1
fi

echo "==> Calculando witness"
node build/kyc_js/generate_witness.js build/kyc_js/kyc.wasm "$INPUT" build/witness.wtns

echo "==> Generando prueba Groth16"
snarkjs groth16 prove build/kyc_final.zkey build/witness.wtns build/proof.json build/public.json

echo "==> Verificando la prueba con snarkjs"
snarkjs groth16 verify build/verification_key.json build/public.json build/proof.json

echo "==> Public signals [commitment, nullifier, issuerRoot, addressHash]:"
cat build/public.json
echo ""
echo "OK: build/proof.json + build/public.json verificados."
