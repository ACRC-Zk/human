// @behuman/shared — Tipos compartidos entre web, api, sdk y curation (STUB).
// Fuente de verdad del diseño: la vault de Obsidian.

// ─── CAPA 1 · Identidad ───────────────────────────────────────────────────

/** Dirección Stellar de un usuario verificado (seudónimo estable, sin PII). */
export type VerifiedAddress = string;

export interface VerificationStatus {
  address: VerifiedAddress;
  isVerified: boolean;
}

// ─── CAPA 2 · Plataforma de opinión ───────────────────────────────────────

export type PostKind = "opinion" | "article" | "study";

/** Input para crear un post (lo que manda el cliente). */
export interface NewPost {
  author: VerifiedAddress;
  kind: PostKind;
  title?: string;
  body: string; // contenido off-chain
}

/** Post ya publicado (contenido off-chain + ancla on-chain). */
export interface Post extends NewPost {
  id: string;
  contentHash: string; // anclado en el contrato opinion_board
  createdAt: number;
  curation: CurationVerdict;
}

// ─── Curaduría ────────────────────────────────────────────────────────────

export type CurationStatus =
  | "approved" // el agente lo aprobó
  | "flagged" // etiquetado (con motivo)
  | "escalated"; // derivado a moderación humana

export interface CurationVerdict {
  status: CurationStatus;
  reason?: string;
}
