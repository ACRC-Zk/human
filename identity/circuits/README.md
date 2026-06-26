# circuits · Circuito ZK (Circom)

Circuito que prueba *"tengo una credencial KYC válida emitida por un issuer de confianza y
cumplo el predicado (mayor de 18 + país permitido)"* — **sin revelar la PII**.

> 📐 Diseño completo en la vault: `Diseño del Circuito ZK` y `Modelo de Datos`.
> Toolchain: **Circom + Groth16**.

## ⚠️ Decisiones de ingeniería (requieren revisión humana de cripto)

1. **Curva BLS12-381** (`--prime bls12381`), no la BN254 por defecto de Circom. El
   verificador on-chain es el `groth16_verifier` **oficial** de soroban-examples, que usa
   las host functions BLS12-381 (CAP-0059). BN254/Poseidon nativas siguen siendo
   CAP-0074/0075 (propuestas, no disponibles).
2. **Atestación del issuer = inclusión Merkle (Poseidon)**, no EdDSA: circomlib
   `eddsaposeidon` depende de BabyJubJub, definida sobre el campo de BN254 y no válida bajo
   bls12381. Merkle es curva-agnóstico y calza con el public signal `issuerRoot`. La vault
   ya lista Merkle como evolución del esquema de firma.
3. **Poseidon con constantes de circomlib (de BN254) reusadas sobre BLS12-381**: son
   elementos de campo válidos, pero no es Poseidon "estándar para bls12381". Aceptable para
   MVP/demostrador; en producción usar parámetros específicos del campo.
4. **`currentYear` es constante de compilación** (2026) en el MVP; en producción debe ser
   input público validado contra el ledger.

## Public signals (orden, contrato ↔ prueba)

```
[ commitment, nullifier, issuerRoot, addressHash ]
```

- `commitment = Poseidon(birthYear, countryCode, secret)` — output.
- `nullifier  = Poseidon(secret, addressHash)` — output (anti-replay + binding).
- `issuerRoot` — raíz Merkle resultante del camino de la credencial — output.
- `addressHash` — input público; atado al address Stellar (validado on-chain).

Privados: `birthYear`, `countryCode`, `secret`, `pathElements[]`, `pathIndices[]`.

## Estructura

```text
circuits/
├── src/kyc.circom              # circuito principal
├── scripts/
│   ├── compile.sh              # circom -> r1cs / wasm / sym (prime bls12381)
│   ├── setup.sh                # powers of tau + zkey (bls12-381) + verification_key.json
│   ├── prove.sh                # witness -> proof.json + public.json (verifica con snarkjs)
│   ├── gen_input.mjs           # escribe input.json (recibe el addressHash del contrato)
│   └── gen_testdata.mjs        # build/*.json -> kyc_verifier/src/testdata.rs (tests)
└── build/                      # artefactos (gitignored)
```

## Uso

```bash
npm install
bash scripts/compile.sh
POWER=13 bash scripts/setup.sh

# addressHash atado a un address (lo calcula el contrato; ver kyc_verifier/README):
node scripts/gen_input.mjs <addressHashDecimal>
bash scripts/prove.sh           # genera y verifica la prueba con snarkjs
node scripts/gen_testdata.mjs   # vuelca los artefactos a los tests del contrato
```

## Requisitos

- `circom` ≥ 2.2 (compilado desde fuente) y `snarkjs` ≥ 0.7 — ver `Setup del Entorno`.
- `circomlib` — se instala con `npm install`.

> ⚠️ El trusted setup de `setup.sh` es **de demo** (entropía local). Producción requiere una
> ceremonia multi-parte real.
