#!/usr/bin/env bash
# Trusted setup Groth16 (powers of tau + zkey) + exporta la verification key.
#
# ⚠️ Ceremonia sobre la curva BLS12-381 (bls12-381), no bn128.
# ⚠️ DEMO/MVP: la "ceremonia" se ejecuta localmente con una entropía de prueba.
#    Para producción hace falta una ceremonia multi-parte real (varios contribuyentes).
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p build
POWER="${POWER:-14}" # 2^14 = 16384; el circuito usa unos pocos miles de constraints

echo "==> Powers of Tau (phase 1, bls12-381, power=$POWER)"
snarkjs powersoftau new bls12-381 "$POWER" build/pot_0000.ptau -v
snarkjs powersoftau contribute build/pot_0000.ptau build/pot_0001.ptau \
  --name="behuman-mvp" -v -e="behuman demo entropy $(date +%s)"

echo "==> Preparando phase 2"
snarkjs powersoftau prepare phase2 build/pot_0001.ptau build/pot_final.ptau -v

echo "==> Groth16 setup (zkey)"
snarkjs groth16 setup build/kyc.r1cs build/pot_final.ptau build/kyc_0000.zkey
snarkjs zkey contribute build/kyc_0000.zkey build/kyc_final.zkey \
  --name="behuman-mvp-key" -v -e="behuman demo key entropy $(date +%s)"

echo "==> Exportando verification key"
snarkjs zkey export verificationkey build/kyc_final.zkey build/verification_key.json

echo "OK: build/kyc_final.zkey + build/verification_key.json"
