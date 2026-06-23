# identity · CAPA 1 — KYC con Zero-Knowledge

El **núcleo** de beHuman: *proof of personhood*. Una persona verifica su identidad una vez
(off-chain) y obtiene una identidad **única y anónima** on-chain. Esta capa expone el puente
que usa todo lo demás: **`is_verified(address)`**.

> 📐 Diseño en la vault: `IDEA`, `Prueba de Persona Única`, `Flujo de KYC`,
> `Diseño del Circuito ZK`, `Contrato Verificador (Soroban)`, `Modelo de Datos`.

| Carpeta | Qué es |
|---|---|
| [`circuits/`](./circuits/) | Circuito Circom (`kyc.circom`) que prueba la credencial KYC. |
| [`contracts/kyc_verifier/`](./contracts/kyc_verifier/) | Contrato Soroban: `verify_and_register` + `is_verified`. **El puente con la CAPA 2.** |
| [`issuer/`](./issuer/) | Issuer KYC **mock** que firma credenciales de prueba. |

> Los contratos Rust son miembros del workspace Cargo raíz (`/Cargo.toml`).
