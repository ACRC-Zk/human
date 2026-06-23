# @behuman/sdk · Cliente / Prover

Lógica compartida que orquesta el flujo del lado del usuario:
**credencial → genera la prueba ZK (en el navegador, WASM) → arma y envía la tx Stellar**.
La consume el frontend `web/` y los scripts de demo.

> 📐 Ver `Flujo de KYC` (Fases 2 y 3) en la vault. Los secretos nunca salen del dispositivo.

## API prevista (a implementar)

| Función | Qué hace |
|---|---|
| `generateProof(credential, predicate, address)` | Construye el witness y genera la prueba Groth16 (snarkjs/WASM). |
| `buildVerifyTx(address, proof, publicInputs)` | Arma la invocación a `verify_and_register` del contrato. |
| `isVerified(address)` | Consulta `is_verified` en el contrato. |

## Stack

- `snarkjs` para generar la prueba en el cliente.
- `@stellar/stellar-sdk` para construir/enviar transacciones Soroban.

```bash
npm install
npm run build
```
