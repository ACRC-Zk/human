# contracts · Contrato Verificador (Soroban)

Contrato Soroban que **verifica la prueba ZK** (Groth16) y **registra** la dirección como
KYC-verificada, garantizando *una persona = una identidad* vía `nullifier`.

> 📐 Diseño en la vault: `Contrato Verificador (Soroban)`, `Flujo de KYC` (Fase 3),
> `Modelo de Datos`. Punto de partida: `groth16_verifier` de `soroban-examples`
> (ver `09 - Tools/Verificadores ZK de referencia`).

## Estructura

```text
contracts/
├── Cargo.toml              # workspace de Rust
└── kyc_verifier/
    ├── Cargo.toml
    └── src/
        └── lib.rs          # verify_and_register + is_verified (stub)
```

## Interfaz (a implementar)

| Función | Qué hace |
|---|---|
| `verify_and_register(address, proof, public_inputs)` | Valida issuer root + address binding + nullifier no usado + `verify_groth16`, y registra. |
| `is_verified(address) -> bool` | Consulta que usan las dApps. |

## Build & test

```bash
stellar contract build          # compila a wasm
cargo test                      # tests del contrato
```

## Requisitos

- Rust + target `wasm32-unknown-unknown`
- Stellar CLI — ver `Setup del Entorno` en la vault.
