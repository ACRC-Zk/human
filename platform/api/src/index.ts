// @behuman/api — Backend de la plataforma de opinión (STUB / scaffolding).
//
// Responsabilidades:
//  - Gating: solo acepta acciones de direcciones con is_verified(address) == true (CAPA 1).
//  - Almacena el contenido off-chain (texto, PDFs de estudios) y expone el feed.
//  - Coordina el anclaje on-chain (hash del contenido → contrato opinion_board) vía @behuman/sdk.
//  - Envía el contenido a la curaduría (platform/curation) antes de publicarlo.
//
// 📐 Ver en la vault: `Plataforma de Opinión Verificada`, `Curaduría y Agentes Validadores`.

import type { Post, NewPost } from "@behuman/shared";

/** Publica un post: verifica identidad → guarda contenido → ancla hash on-chain. STUB. */
export async function createPost(_input: NewPost): Promise<Post> {
  // TODO 1: comprobar is_verified(author) (vía @behuman/sdk)
  // TODO 2: guardar contenido off-chain y calcular su hash
  // TODO 3: anclar el hash en opinion_board (post(author, contentHash))
  // TODO 4: encolar para curaduría
  throw new Error("createPost no implementado — ver vault: Plataforma de Opinión Verificada");
}

/** Devuelve el feed de posts publicados. STUB. */
export async function getFeed(): Promise<Post[]> {
  throw new Error("getFeed no implementado");
}

console.log("beHuman api — scaffolding. Implementar createPost() y getFeed().");
