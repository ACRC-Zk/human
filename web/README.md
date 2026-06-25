# web · Frontend (React + Vite + TypeScript)

La app de beHuman. Capa 1: **gate de identidad en vivo** — consentimiento → foto del DNI →
escaneo de cara con la cámara → resultado (match 1:1 + liveness). Postea al backend matcher.

> 📐 `Flujo de KYC` · `Spec — Matcher DNI + Selfie (Capa 1)` en la vault.

## Desarrollo

```bash
npm install                         # desde la raíz del monorepo
npm run serve -w @behuman/issuer    # backend matcher en :8787 (necesita modelos)
npm run dev -w @behuman/web         # frontend en :5173
```

Abre http://localhost:5173. La cámara requiere contexto seguro (localhost o https).
Config: `VITE_MATCHER_URL` (default `http://localhost:8787`).

## Estructura

```text
web/src/
├── App.tsx              # monta el flujo
└── kyc/
    ├── Consent.tsx      # consentimiento (Ley 25.326)
    ├── DocumentUpload.tsx
    ├── FaceScan.tsx     # getUserMedia + challenge (parpadeo/giro)
    ├── KycFlow.tsx      # máquina de estados del gate
    └── api.ts           # POST /verify (multipart)
```

## Privacidad

Las imágenes van al backend por multipart y **no se persisten**; el backend devuelve solo
`ok/score/liveness/reasons`. Nada de PII toca la cadena.

## Próximos pasos

- Commitment no-custodial en el navegador (Poseidon-bls vía wasm) + `/enroll`.
- Conexión de wallet (Stellar Wallets Kit) y `verify_and_register` desde el cliente.
- Hoy el registro on-chain se demuestra vía `scripts/e2e_demo.sh` (SDK en Node).
