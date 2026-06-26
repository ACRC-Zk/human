# CAPA 3 — Auditoría de seguridad (Red Team / Blue Team)

Ejercicio adversarial sobre la integración **Funding ZK** (rama `ground-funding`). El Red
Team intentó violar las invariantes; el Blue Team corrigió cada hallazgo. Verificación
independiente: `cargo test` (14), 3 builds TS limpios, y e2e de los exploits (ahora fallan).

Invariantes: **I1** Anonimato/cero PII · **I2** Anti-Sybil · **I3** No-custodia ·
**I4** Binding de opinión · **I5** Gate por pertenencia.

| ID | Sev | Invariante | Hallazgo | Fix |
|----|-----|-----------|----------|-----|
| RT-01 | Crítica | I3 | La API validaba el "2-de-3" comparando **direcciones públicas** (en `GET /campaigns`) como si fueran credencial → cualquiera disparaba `release`/`approve`/`refund`. | Auth criptográfica: cada firmante firma un **challenge determinístico** (Ed25519 Stellar); la API verifica la firma (`packages/sdk/fundingAuth.ts`). Firmantes = keypairs reales. Autoridad última = contrato on-chain. |
| RT-02 | Crítica | I2,I4 | El fallback dev tomaba `platformId`/`nullifier` del **body sin prueba** → Sybil ilimitado del sentimiento. | Eliminado el fallback. En todo modo se exige `opinionProof` válida; identidad/nullifier salen solo de `bindFundingOpinion` + verificación. |
| RT-03 | Alta | I3 | `init` del contrato sin `require_auth` → front-run de configuración. | `init(admin, …)` con `admin.require_auth()` y admin ∈ signers. |
| RT-04 | Alta | I3 | `donate`/`release` sin chequeo de deadline → refunds atrapados / liberación tardía. | Contrato y API: `donate` rechaza tras deadline; éxito = meta **antes** del deadline; `release` exige `timestamp <= deadline`. |
| RT-05 | Alta | I1,I5 | Membership no atada a la wallet; `/position` filtraba montos por wallet sin auth. | `verifyMembership` cripto en todo modo; wallet efímera **por donación**; `/position` exige firma de titularidad. Binding membership↔wallet a nivel circuito: documentado como limitación (no se toca el circuito de plataforma trusteado). |
| RT-06 | Media | I2,I3 | TOCTOU en el store JSON → doble nullifier / lost update. | `withStore()` serializa mutaciones; `claimNullifier()` atómico insert-if-absent. |
| RT-07 | Media | — | Handlers async sin try/catch → crash/DoS en modo real. | `wrap()` + middleware de error; fallos de providers → **502** controlado. |
| RT-08 | Media | I2 | Fail-open de curaduría ocultaba y descontaba votos (censura/integridad). | Conteo anti-Sybil persiste **independiente** del curador; la moderación solo afecta visibilidad. |
| RT-09 | Media | I3 | Refund devolvía principal+yield y **borraba** donaciones (doble refund / inauditable). | Devuelve **exactamente el principal**; marca `refunded` idempotente; sin atajo `disputed`. |
| RT-10 | Baja | I4 | `contentHashSq` era restricción muerta (binding real lo daba el input público). | Eliminada del circuito (recompilado); documentado que el binding lo da el status de input público. |
| RT-11 | Baja | I1 | `strToField` sin separación de dominio en `contentHash`. | Prefijo `"funding-content:"` (SDK + web, espejo); masking de 2 bits documentado como intencional. |

## Nota positiva
El contrato `campaign_controller` ya era sólido: `verify_signers` exige `require_auth` por
firmante, rechaza no-firmantes/duplicados, y `refund` es reentrancy-safe (zera la
contribución antes del transfer). El problema grave (RT-01) era que **la API no usaba el
contrato** y reimplementaba las reglas con strings.

## Limitación conocida (mitigada)
La prueba de personhood de la **donación** no se ata a la `donorWallet` a nivel circuito
(requeriría modificar el circuito de plataforma trusteado, fuera de alcance). Mitigado con:
verificación criptográfica de la membership, wallet efímera por donación y `/position`
autenticada. Pendiente para cuando se haga la integración on-chain (Manager del vault).

## Verificación de remediación
- `cargo test -p campaign_controller`: **14 passed**. `stellar contract build`: OK.
- Builds `@behuman/sdk`, `@behuman/funding-api`, `@behuman/web`: limpios.
- e2e de exploits (instancia aparte): approve/release sin firma → **403**; opinión sin
  prueba → **403**; prueba reusada con otro contenido → **403**; donar sin membership →
  **403**; caminos válidos → **200**.
