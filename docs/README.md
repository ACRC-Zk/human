# docs · beHuman

Este repo (`beHuman`) es **solo código**. Todo el **diseño, la teoría y las decisiones**
del producto viven en la **vault de Obsidian**, en el repo hermano `obsidian-vault-zk`.

## Mapa: documentación ↔ código

| Documentación (vault) | Componente de este repo |
|---|---|
| `IDEA`, `Prueba de Persona Única` | la visión de las dos capas |
| `Flujo de KYC` | `packages/sdk/` + `scripts/e2e_demo.sh` |
| `Diseño del Circuito ZK` | `identity/circuits/src/kyc.circom` |
| `Contrato Verificador (Soroban)` | `identity/contracts/kyc_verifier/src/lib.rs` |
| `Modelo de Datos` | credencial en `identity/issuer/`, storage en `identity/contracts/` |
| `Plataforma de Opinión Verificada` | `platform/contracts/opinion_board` + `platform/api` |
| `Curaduría y Agentes Validadores` | `platform/curation` |
| `Identidad Pública vs Anónima` | modelo de identidad de `platform/` (seudónimo estable) |
| `09 - Tools/Plan de armado con IA` | guía paso a paso para desarrollar |
| `Estructura del Codigo` | esta misma estructura de monorepo |

## Cómo abrir la documentación

1. Instalá [Obsidian](https://obsidian.md).
2. *Open folder as vault* → seleccioná la carpeta `obsidian-vault-zk`.
3. Empezá por `00 - Inicio/🏠 Home`.

> 🔗 Cuando el repo de docs sea público, enlazar acá su URL.
