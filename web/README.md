# web · Frontend (React + Vite + TypeScript)

La app de beHuman. Guía al usuario por el flujo: verificar identidad → generar la prueba ZK
en el dispositivo → registrarse on-chain en Stellar. Consume `@behuman/sdk`.

> 📐 Pasos del usuario en la vault: `Flujo de KYC`. Wallets: ver `Stellar Wallets Kit`
> en `09 - Tools/Recursos ZK & Privacy en Stellar`.

## Desarrollo

```bash
npm install          # desde la raíz del monorepo
npm run dev          # o: npm run dev --workspace web
```

Abre http://localhost:5173

## Estructura

```text
web/
├── index.html
├── vite.config.ts
└── src/
    ├── main.tsx        # entry
    ├── App.tsx         # pantalla inicial (scaffolding)
    ├── App.css
    └── index.css
```

## Próximos pasos (a desarrollar)

- Conexión de wallet (Stellar Wallets Kit).
- Flujo de onboarding con el issuer mock.
- Generación de prueba en el navegador (WASM, vía `@behuman/sdk`).
- Llamada a `verify_and_register` y estado de verificación.
