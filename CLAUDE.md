# beHuman — Guía para agentes de IA

> Leé esto antes de tocar el código. Este archivo encapsula el contexto que vive en la
> **vault de Obsidian** (repo hermano `obsidian-vault-zk`, en `../obsidian-vault-zk/`).

## Qué es beHuman

**KYC con Zero-Knowledge sobre Stellar** — *proof of personhood*: una persona prueba que es
**real y única** sin revelar su PII. Verifica su identidad una vez (off-chain), genera una
**prueba ZK** y la verifica un **contrato Soroban** que la registra sin saber quién es.
Encima se construye una plataforma de opinión verificada (capa 2, post-MVP).

## ⚠️ Antes de escribir código (regla de Stellar)

1. **Leé `skills.stellar.org`** — en especial la skill **zk-proofs** (verificación Groth16
   con BN254 / Poseidon). Mejora drásticamente el código.
2. Usá las skills instaladas (`stellar-dev-skill`, `openzeppelin-skills`) y `llms.txt`
   (https://developers.stellar.org/llms.txt) como contexto.
3. Seguí los patrones de seguridad de stellar-dev-skill y los detectores de OpenZeppelin
   para todo lo que toque el contrato.

## Decisiones ya tomadas (no reabrir sin avisar)

- **Toolchain ZK: Circom + Groth16** (verificación on-chain más barata, verificador oficial
  de `soroban-examples`). Plan B: Noir/UltraHonk.
- **Monorepo único** (este repo). Docs separadas en la vault de Obsidian.
- Nombre de trabajo: **beHuman**. Organización GitHub: **ACRC-Zk**.

## Estructura

| Carpeta | Qué es |
|---|---|
| `circuits/` | Circuito Circom (`kyc.circom`) |
| `contracts/kyc_verifier/` | Contrato Soroban (`verify_and_register`, `is_verified`) |
| `issuer/` | Issuer KYC **mock** (TS) — firma credenciales de prueba |
| `packages/sdk/` | Prover + orquestación de tx Stellar (TS, compartido) |
| `web/` | Frontend **React + Vite + TS** |
| `scripts/` | `deploy_testnet.sh`, `e2e_demo.sh` |
| `docs/` | Puente a la vault |

## Dónde está cada cosa en la vault (la fuente de verdad del diseño)

- `IDEA`, `Prueba de Persona Única` — la visión.
- `Flujo de KYC` — las 4 fases (emisión → prueba → verificación → consumo).
- `Diseño del Circuito ZK` — inputs/outputs, commitment, nullifier, riesgos.
- `Contrato Verificador (Soroban)` — la interfaz on-chain.
- `Modelo de Datos` — credencial y storage.
- `09 - Tools/*` — recursos, skills de IA, verificadores de referencia, **Plan de armado con IA**.

## Estado

Esto es **scaffolding**: estructura + stubs con `TODO`. Implementar en el orden de
`09 - Tools/Plan de armado con IA`. **No es un KYC real**: el issuer es un mock (declararlo).

## Convenciones

- Commits: convencionales (`feat:`, `fix:`, `chore:`…).
- Revisión humana obligatoria de la cripto (nullifier, address binding, issuer root).
- Secretos en `.env` (ver `.env.example`); nunca commitear PII ni claves.
