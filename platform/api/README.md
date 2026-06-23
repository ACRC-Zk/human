# platform/api · Backend de la plataforma

Servicio off-chain de la **plataforma de opinión** (CAPA 2). Guarda el contenido pesado,
expone el feed y coordina el anclaje on-chain.

> 📐 Ver en la vault: `Plataforma de Opinión Verificada`, `Identidad Pública vs Anónima`.

## Qué hace (a implementar)

1. **Gating:** solo acepta acciones de direcciones verificadas (`is_verified` de la CAPA 1).
2. **Almacenamiento off-chain** del contenido (texto, PDFs de estudios). MVP: DB; futuro: IPFS/Arweave.
3. **Anclaje on-chain:** sube el `content_hash` al contrato `opinion_board` (vía `@behuman/sdk`).
4. **Curaduría:** envía el contenido a `platform/curation` antes de publicarlo.

```bash
npm install
npm run dev
```
