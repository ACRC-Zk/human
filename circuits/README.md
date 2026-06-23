# circuits · Circuito ZK (Circom)

Circuito que prueba *"tengo una credencial KYC válida firmada por un issuer de confianza y
cumplo el predicado X (ej. mayor de 18, país permitido)"* — **sin revelar la PII**.

> 📐 Diseño completo en la vault: `Diseño del Circuito ZK` y `Modelo de Datos`.
> Toolchain elegida: **Circom + Groth16** (verificación on-chain más barata). Plan B: Noir.

## Estructura

```text
circuits/
├── src/
│   └── kyc.circom          # circuito principal (stub)
├── scripts/
│   ├── compile.sh          # circom → r1cs / wasm / sym
│   ├── setup.sh            # powers of tau + zkey (trusted setup)
│   └── prove.sh            # genera una prueba de ejemplo
└── build/                  # artefactos (gitignored)
```

## Idea del circuito (a implementar)

- **Inputs privados (witness):** atributos/PII, `secret`, firma del issuer.
- **Inputs públicos:** `issuerRoot`, `nullifier`, `addressHash`, parámetros del predicado.
- **Restricciones:** verifica la firma/Merkle del issuer → evalúa el predicado → expone
  `commitment = Poseidon(atributos, secret)` y `nullifier = Poseidon(secret, addressHash)`.

## Requisitos

- `circom` (>= 2.x) y `snarkjs` — ver `Setup del Entorno` en la vault.
- `circomlib` (Poseidon, comparadores, Merkle) — se instala con `npm install`.

## Uso (cuando esté implementado)

```bash
npm install
bash scripts/compile.sh
bash scripts/setup.sh
bash scripts/prove.sh
```
