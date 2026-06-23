# platform/contracts · opinion_board (Soroban)

Ancla on-chain de la **plataforma de opinión** (CAPA 2). No guarda el contenido — guarda la
prueba de que *"este post lo escribió una persona verificada y única; su contenido es el del
hash X"*. El contenido pesado vive off-chain en [`../api`](../api).

> 🌉 **Puente con la CAPA 1:** antes de aceptar un post, hace un cross-contract call a
> `is_verified(author)` del contrato `kyc_verifier` (`identity/contracts/`). Es la única
> dependencia entre capas.
>
> 📐 Diseño en la vault: `Plataforma de Opinión Verificada`, `Identidad Pública vs Anónima`.

## Interfaz (a implementar)

| Función | Qué hace |
|---|---|
| `init(kyc_verifier)` | Guarda la dirección del contrato de KYC (CAPA 1). |
| `post(author, content_hash) -> id` | Requiere `is_verified(author)`; ancla autor + hash + timestamp. |
| `get_post(id) -> PostRecord` | Lee un post anclado. |

> El contrato es parte del workspace Cargo raíz (`/Cargo.toml`). Build: `stellar contract build`.
