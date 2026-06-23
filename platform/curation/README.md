# platform/curation · Agentes validadores + moderación

Curaduría en **dos niveles** que mantiene la calidad/veracidad del contenido sin censurar.

> 📐 Ver en la vault: `Curaduría y Agentes Validadores`.

## Niveles

1. **Agente validador (IA, automático):** evalúa veracidad, fuentes, coherencia, toxicidad,
   plagio. Usa la API de Claude.
2. **Moderación humana (derivación):** los casos ambiguos o sensibles se escalan a personas.

> **Principio rector:** no perder el criterio de la persona — filtrar ruido y abuso, no
> acallar opiniones legítimas.

## Pendiente de definir (de la vault)

- Qué evalúa exactamente el agente y dónde está el límite con la moderación humana.
- Cómo se eligen/gobiernan los moderadores (¿personas verificadas? ¿reputación?).
- Si la curaduría es on-chain, off-chain o híbrida (los agentes corren off-chain).
- Si hay apelación de una decisión.

```bash
npm install
npm run dev
```
