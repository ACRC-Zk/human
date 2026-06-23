// @behuman/curation — Curaduría en dos niveles (STUB / scaffolding).
//
// Nivel 1: agente validador (IA) evalúa veracidad / fuentes / toxicidad / plagio.
// Nivel 2: si el caso es ambiguo o fuera de criterio, lo deriva a moderación humana.
//
// Principio rector: NO perder el criterio de la persona — filtrar ruido/abuso, no censurar.
// 📐 Ver en la vault: `Curaduría y Agentes Validadores`.

import type { Post, CurationVerdict } from "@behuman/shared";

// Modelo del agente validador. Configurable; por defecto el más capaz para buen criterio.
const CURATION_MODEL = "claude-opus-4-8";

/**
 * Nivel 1 — el agente revisa un post. STUB.
 * Devuelve un veredicto: aprobado / etiquetado / derivado a humanos.
 */
export async function reviewPost(_post: Post): Promise<CurationVerdict> {
  // TODO: llamar a la API de Claude (modelo CURATION_MODEL) con una rúbrica:
  //   ¿cita fuentes? ¿es coherente y verificable? ¿hay abuso/odio? ¿plagio?
  // Si la confianza es baja o el caso es sensible -> escalar a moderación humana.
  void CURATION_MODEL;
  throw new Error("reviewPost no implementado — ver vault: Curaduría y Agentes Validadores");
}

/** Nivel 2 — encola un caso para moderadores humanos. STUB. */
export async function escalateToModeration(_post: Post, _reason: string): Promise<void> {
  throw new Error("escalateToModeration no implementado");
}

console.log("beHuman curation — scaffolding. Implementar reviewPost() + escalateToModeration().");
