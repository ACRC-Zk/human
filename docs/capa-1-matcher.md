# Capa 1 — Identidad KYC-ZK (matcher DNI + selfie)

> Puente a la vault: `06 - Implementacion/Spec — Matcher DNI + Selfie (Capa 1)`,
> `05 - Arquitectura/Matcher de Identidad (Gate de Capa 1)`, `Flujo de KYC`,
> carpeta `KYC-Identidad/`.

## Qué hace

Una persona prueba que es **real y única** sin revelar quién es:

1. **Gate (testnet):** sube la foto del DNI + escanea su cara con la cámara. El backend
   hace **face match 1:1** (DNI ↔ cámara) + **liveness** (challenge). Solo si pasa, sigue.
2. **Issuer:** crea la identidad de Capa 1 (commitment en un árbol Merkle de humanos
   verificados), con **de-dup anti-Sybil** por hash del documento. Descarta la PII.
3. **Prueba ZK:** el device genera la prueba Groth16 (BLS12-381) — la PII/secret nunca sale.
4. **On-chain:** `verify_and_register` en `kyc_verifier` (Soroban) → `Verified(address)` +
   nullifier (anti doble registro). Las dApps consultan `is_verified(address)`.

```
[web] consent + DNI + cara  →  [issuer/matcher] gate  →  [issuer] identidad + árbol
                                                       →  [sdk] prueba ZK
                                                       →  [kyc_verifier] Verified(address)
```

## Garantías de privacidad (Ley 25.326)

- **Cero PII on-chain**: solo commitment / proof / nullifier / issuerRoot / predicados.
- Imágenes **efímeras** (en memoria, nunca a disco), **nunca** en logs.
- De-dup guarda **solo** `sha256(docId + pepper)`, nunca el documento.
- Consentimiento explícito antes de capturar.

## Alcance y mocks (testnet)

- **Matcher de prueba** (face-api), **no** RENAPER. No valida autenticidad del documento
  ni hace AML. Liveness = challenge activo, **no** PAD certificado iBeta.
- El provider es **intercambiable por config** (`IDENTITY_PROVIDER`): `testnet` (hoy),
  `dev` (solo tests/e2e, aprueba sin biometría), `renaper` (stub de producción). Cambiar de
  uno a otro **no toca** issuer ni la capa ZK.
- **Curva BLS12-381** (no BN254): el verificador Groth16 oficial usa las host functions
  BLS12-381 (CAP-0059). Detalle en `identity/circuits/README.md` y el README del contrato.
- `trusted_root` se fija en `init`: el e2e despliega un contrato por demo. Un registro
  multi-usuario con root incremental es trabajo futuro.

## Decisiones (defaults documentados)

| Decisión | Default |
|---|---|
| Umbral de match | `MATCH_THRESHOLD=0.6` (distancia euclidiana face-api; calibrar) |
| Secret | **user-side / no-custodial** (el issuer nunca lo ve) |
| Liveness | challenge activo (parpadeo/giro) + anti-foto-estática |
| Backend | Node/TypeScript (face-api + tfjs-node) |

## Correr todo

```bash
npm install
npm run download-models -w @behuman/issuer

# circuito (una vez)
cd identity/circuits && npm install && bash scripts/compile.sh && POWER=13 bash scripts/setup.sh && cd ../..

# gate + UI
npm run serve -w @behuman/issuer      # backend en :8787
npm run dev   -w @behuman/web         # frontend (cámara) en :5173

# e2e on-chain (deploy + register + verify en testnet)
bash scripts/e2e_demo.sh
```

## Tests

```bash
npm test -w @behuman/issuer   # gate (match/liveness) + enroll/de-dup
npm test -w @behuman/sdk      # poseidon/merkle/encoding/prueba off-chain
cargo test -p kyc_verifier    # contrato (pairing + registro)
```

## Criterios de aceptación

- DNI + cara que coinciden → identidad creada y `Verified(address)` en testnet.
- Cara distinta → rechazo (no se crea identidad).
- Foto estática → rechazada por liveness.
- Segundo intento de la misma persona → rechazado (de-dup + nullifier).
- Cero PII en logs y on-chain.
- Provider intercambiable por config.
