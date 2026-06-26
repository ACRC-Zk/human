# contracts · Contrato Verificador (Soroban)

Contrato Soroban que **verifica la prueba ZK** (Groth16) y **registra** la dirección como
KYC-verificada, garantizando *una persona = un registro* vía `nullifier`.

> 📐 Diseño en la vault: `Contrato Verificador (Soroban)`, `Flujo de KYC` (Fase 3),
> `Modelo de Datos`. Punto de partida: `groth16_verifier` de `soroban-examples`
> (ver `09 - Tools/Verificadores ZK de referencia`).

## ⚠️ Curva: BLS12-381 (no BN254)

El verificador Groth16 **oficial** de soroban-examples usa las host functions
**BLS12-381** (`crypto::bls12_381`, CAP-0059, disponible). Las primitivas BN254 / Poseidon
nativas siguen siendo **CAP-0074/0075 (propuestas, no disponibles en el SDK)**. Por eso:

- El circuito se compila con `--prime bls12381` (ver `identity/circuits`).
- Este contrato verifica el pairing sobre BLS12-381, con la **misma lógica** del
  `groth16_verifier` oficial, más: issuer root, address binding y nullifier.
- SDK fijado en `soroban-sdk = 25.x` (trae `crypto::bls12_381`).

## Interfaz

| Función | Qué hace |
|---|---|
| `init(admin, trusted_root, vk)` | Guarda el issuer root de confianza y la verifying key. Una sola vez. |
| `verify_and_register(address, proof, public_inputs)` | `require_auth` + issuer root + address binding + nullifier no usado + pairing Groth16, y registra. |
| `verify_proof(proof, public_inputs) -> bool` | Verificación pura del pairing (sin registrar). |
| `is_verified(address) -> bool` | Consulta que usan las dApps de la CAPA 2. |
| `address_field_hash(address) -> BytesN<32>` | `addressHash` esperado para el address (lo usa el prover off-chain). |

**Public inputs** (orden acordado con el circuito), cada uno `BytesN<32>` big-endian:

```
[ commitment, nullifier, issuerRoot, addressHash ]
```

### Address binding

`addressHash = sha256(address.to_xdr())` con los 2 bits más altos en 0 (para que el valor
sea `< r_bls12381` y no haya reducción modular: las representaciones on-chain y del circuito
son idénticas byte a byte). El prover off-chain debe usar exactamente `address_field_hash`.

## Build & test

```bash
stellar contract build          # compila a wasm (target wasm32v1-none)
cargo test -p kyc_verifier      # tests del contrato
```

Los tests usan los artefactos reales del pipeline ZK (`src/testdata.rs`) para comprobar que
la prueba generada por Circom+snarkjs **verifica con la lógica del `groth16_verifier`**, más
los caminos negativos (issuer no confiable, address mismatch, replay del nullifier).

### Regenerar `testdata.rs` (si cambia el circuito)

```bash
# 1) addressHash del address fijo de test
cargo test -p kyc_verifier print_address_hash -- --ignored --nocapture   # -> ADDRESS_HASH_HEX=...
# 2) input + prueba + datos de test (ver identity/circuits/README)
cd ../circuits
node scripts/gen_input.mjs <addressHashDecimal>
bash scripts/prove.sh
node scripts/gen_testdata.mjs
```

## Requisitos

- Rust + target `wasm32v1-none` (Stellar CLI ≥ 23). Ver `Setup del Entorno` en la vault.
- Stellar CLI.

## ⚠️ Estado / revisión de cripto

MVP con **issuer mock**. Requiere **revisión humana** de: derivación del nullifier, address
binding, manejo del issuer root, y de las decisiones de curva/hash (Poseidon con constantes
de BN254 reusadas sobre BLS12-381) documentadas en `identity/circuits/src/kyc.circom`.
Además: TTL de las entradas `Persistent` (`Verified`, `Nullifier`) — renovar o documentar
expiración (state archival de Soroban).
