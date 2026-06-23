# beHuman

> **KYC con Zero-Knowledge sobre Stellar** — *proof of personhood*: probás que sos una
> persona real y **única** sin revelar quién sos. Monorepo del producto.

beHuman permite que una persona verifique su identidad una sola vez (off-chain, sin que su
PII toque la cadena) y luego **demuestre con una prueba ZK** que cumple ciertas condiciones
(es persona única, mayor de edad, país permitido…) ante cualquier dApp de Stellar. La
prueba se **verifica en un contrato Soroban**, que registra la dirección como verificada
sin saber quién es.

📚 **La documentación, diseño y decisiones viven en la vault de Obsidian** (repo hermano
`obsidian-vault-zk`). Este repo es **solo el código**. Ver [`docs/`](./docs/README.md).

---

## 🗂️ Estructura del monorepo

| Carpeta | Qué es | Stack |
|---|---|---|
| [`circuits/`](./circuits/) | Circuito ZK que prueba la credencial KYC | Circom + Groth16 (snarkjs) |
| [`contracts/`](./contracts/) | Contrato verificador on-chain | Rust + Soroban SDK |
| [`issuer/`](./issuer/) | Issuer KYC **mock** que firma credenciales de prueba | TypeScript / Node |
| [`packages/sdk/`](./packages/sdk/) | Lógica cliente compartida: genera la prueba + arma la tx Stellar | TypeScript |
| [`web/`](./web/) | Frontend de la app | **React + Vite + TypeScript** |
| [`scripts/`](./scripts/) | Deploy a testnet + demo end-to-end | Bash |
| [`docs/`](./docs/) | Puente a la vault de documentación | — |

```text
beHuman/
├── circuits/        # Circom — circuito kyc
├── contracts/       # Soroban — kyc_verifier (Rust workspace)
├── issuer/          # mock issuer (firma credenciales)
├── packages/
│   └── sdk/         # prover + orquestación de tx (TS, compartido)
├── web/             # React + Vite (frontend)
├── scripts/         # deploy_testnet.sh, e2e_demo.sh
└── docs/            # enlaza a la vault de Obsidian
```

---

## 🚀 Quickstart

> Esto es **scaffolding**: la estructura está; la implementación se desarrolla más adelante.

```bash
# Requisitos: Node 20+, Rust + wasm32-unknown-unknown, Stellar CLI, circom + snarkjs
npm install                 # instala los workspaces JS (web, issuer, packages/*)

npm run dev                 # levanta el frontend React (web/)
make contract-build         # compila el contrato Soroban
make circuit-compile        # compila el circuito Circom
```

Ver targets disponibles en el [`Makefile`](./Makefile).

---

## 🧱 Estado

- [x] Estructura del monorepo
- [ ] Circuito `kyc.circom` (ver `circuits/`)
- [ ] Contrato `kyc_verifier` (ver `contracts/`)
- [ ] Issuer mock (ver `issuer/`)
- [ ] SDK cliente / prover (ver `packages/sdk/`)
- [ ] Frontend React (ver `web/`)
- [ ] Deploy testnet + demo E2E (ver `scripts/`)

## 📄 Licencia

Pendiente de definir (la hackathon requiere repo open-source).

---

*Organización: [ACRC-Zk](https://github.com/ACRC-Zk) · Hackathon: Stellar Hacks: Real-World ZK*
