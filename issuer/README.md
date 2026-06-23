# issuer · Issuer KYC (MOCK)

Emisor de credenciales **de prueba**. Simula el proveedor que hace el KYC real off-chain y
**firma una credencial** (`commitment = Poseidon(atributos, secret)`). La **PII nunca sale
de acá hacia la cadena**.

> ⚠️ **Es un mock** — declarado como tal (lo exige la hackathon). No es un KYC real.
> 📐 Ver `Flujo de KYC` (Fase 1) y `Modelo de Datos` en la vault.

## Qué hace (a implementar)

1. Recibe atributos de identidad (documento, fecha de nacimiento, país…).
2. Calcula el `commitment` con Poseidon.
3. Firma la credencial con la clave del issuer.
4. Devuelve `{ commitment, firma, atributos }` al cliente.

## Uso

```bash
npm install
npm run dev
```
