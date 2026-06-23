#!/usr/bin/env bash
# Compila el circuito Circom → r1cs / wasm / sym. STUB de scaffolding.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p build

echo "==> Compilando src/kyc.circom"
# TODO: descomentar cuando el circuito esté implementado
# circom src/kyc.circom --r1cs --wasm --sym -o build -l node_modules

echo "STUB: implementar compilación. Ver 'Diseño del Circuito ZK' en la vault."
