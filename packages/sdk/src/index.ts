// @behuman/sdk — Cliente / Prover (STUB / scaffolding).
// Orquesta: credencial → prueba ZK (WASM) → tx Stellar.
// 📐 Ver `Flujo de KYC` (Fases 2 y 3) en la vault.

export interface Predicate {
  minAge?: number;
  allowedCountries?: string[];
}

export interface ZkProof {
  proof: unknown; // formato Groth16 (snarkjs)
  publicInputs: string[];
}

/** Genera la prueba ZK en el cliente. STUB. */
export async function generateProof(
  _credential: unknown,
  _predicate: Predicate,
  _address: string,
): Promise<ZkProof> {
  throw new Error("generateProof no implementado — ver vault: Flujo de KYC (Fase 2)");
}

/** Arma la tx que invoca verify_and_register. STUB. */
export async function buildVerifyTx(
  _address: string,
  _proof: ZkProof,
): Promise<unknown> {
  throw new Error("buildVerifyTx no implementado — ver vault: Flujo de KYC (Fase 3)");
}

/** Consulta is_verified en el contrato kyc_verifier (CAPA 1). STUB. */
export async function isVerified(_address: string): Promise<boolean> {
  throw new Error("isVerified no implementado — ver vault: Flujo de KYC (Fase 4)");
}

// ─── CAPA 2 · Plataforma ────────────────────────────────────────────────────

/** Ancla un post en el contrato opinion_board (autor verificado + hash). STUB. */
export async function anchorPost(_author: string, _contentHash: string): Promise<bigint> {
  throw new Error("anchorPost no implementado — ver vault: Plataforma de Opinión Verificada");
}
