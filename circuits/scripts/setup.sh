#!/usr/bin/env bash
# Trusted setup Groth16 (powers of tau + zkey) + exporta la verification key. STUB.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p build

echo "==> Trusted setup (Groth16)"
# TODO: implementar con snarkjs
# snarkjs powersoftau new bn128 12 build/pot12_0000.ptau -v
# snarkjs powersoftau prepare phase2 ...
# snarkjs groth16 setup build/kyc.r1cs build/pot12_final.ptau build/kyc_0000.zkey
# snarkjs zkey export verificationkey build/kyc_final.zkey build/verification_key.json

echo "STUB: implementar trusted setup. Ver 'Diseño del Circuito ZK' en la vault."
