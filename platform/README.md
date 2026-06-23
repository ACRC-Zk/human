# platform · CAPA 2 — Plataforma de opinión verificada

La **aplicación** sobre el núcleo de identidad: una plaza pública donde **personas
verificadas y únicas** opinan en hilos y publican artículos/estudios — sin exponer su PII,
con curaduría que mantiene la veracidad sin censurar.

> 🌉 Depende de la CAPA 1 por un solo punto: cada acción se habilita con
> **`is_verified(address)`** del contrato `kyc_verifier`.
>
> 📐 Diseño en la vault: `Plataforma de Opinión Verificada`, `Curaduría y Agentes
> Validadores`, `Identidad Pública vs Anónima`.

| Carpeta | Qué es |
|---|---|
| [`contracts/`](./contracts/) | `opinion_board` — ancla on-chain (autor verificado + hash del post). |
| [`api/`](./api/) | Backend: feed, posts, almacenamiento off-chain del contenido. |
| [`curation/`](./curation/) | Agentes validadores (IA) + cola de moderación humana. |

## Modelo de identidad en la plataforma

**Seudónimo estable:** cada persona publica bajo su `address` verificada. Sus posts son
**linkeables entre sí** (construye reputación, ayuda a la curaduría) pero **la PII real
queda oculta** — el equilibrio anonimato ↔ responsabilidad de `Identidad Pública vs Anónima`.

## Almacenamiento (híbrido)

- **On-chain (`opinion_board`):** prueba de *"posteado por humano único verificado, hash = X"*.
- **Off-chain (`api`):** el contenido pesado (texto, PDFs). MVP: DB; futuro: IPFS/Arweave.
