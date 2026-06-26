// @behuman/sdk — CAPA 3 · Autenticación criptográfica de acciones no-custodiales.
//
// RT-01: las acciones approve/release/refund NO deben validarse comparando strings de
// direcciones públicas (cualquiera las conoce: vienen en GET /campaigns). Cada firmante
// debe firmar un CHALLENGE determinístico de la acción con su clave secreta Stellar; la API
// verifica la firma contra la pubkey del firmante (Ed25519 vía @stellar/stellar-sdk).
//
// ⚠️ La autoridad ÚLTIMA es el contrato on-chain `campaign_controller` (que exige
// `require_auth` por firmante en `release`/`donate` y reglas de deadline/meta). Mientras el
// contrato no esté desplegado, la API es la capa que refleja las reglas y por eso exige esta
// prueba de firma; NO reemplaza al contrato, lo orquesta.
import * as StellarSdk from "@stellar/stellar-sdk";

const { Keypair } = StellarSdk;

export type FundingAction = "approve" | "release" | "refund";

/**
 * Challenge determinístico de una acción. Atado a la acción, la campaña y un estado
 * verificable (p.ej. raised o milestoneId) para que una firma no se reuse en otra acción.
 * Debe construirse idéntico en el firmante (web) y el verificador (API).
 */
export function fundingChallenge(action: FundingAction, campaignId: string, bound: string): string {
  return `behuman-funding:${action}:${campaignId}:${bound}`;
}

export interface SignedAction {
  signer: string; // pubkey Stellar (G...)
  signature: string; // base64 de la firma Ed25519 del challenge
}

/** Genera un keypair Stellar real (G.../S...). Útil para sembrar firmantes de demo (dev). */
export function generateFundingKeypair(): { publicKey: string; secret: string } {
  const kp = Keypair.random();
  return { publicKey: kp.publicKey(), secret: kp.secret() };
}

/** Firma un challenge con la secret de un firmante (G.../S...). Devuelve {signer, signature}. */
export function signFundingAction(secret: string, challenge: string): SignedAction {
  const kp = Keypair.fromSecret(secret);
  const sig = kp.sign(Buffer.from(challenge, "utf8"));
  return { signer: kp.publicKey(), signature: sig.toString("base64") };
}

/** Verifica que `sa.signer` firmó `challenge`. Rechaza pubkeys/firmas malformadas. */
export function verifyFundingSignature(sa: SignedAction | undefined, challenge: string): boolean {
  if (!sa || typeof sa.signer !== "string" || typeof sa.signature !== "string") return false;
  try {
    const kp = Keypair.fromPublicKey(sa.signer);
    return kp.verify(Buffer.from(challenge, "utf8"), Buffer.from(sa.signature, "base64"));
  } catch {
    return false;
  }
}

/**
 * Valida un conjunto de firmas para `release` (2-de-3): cada SignedAction debe (a) tener
 * firma válida del challenge, (b) ser un firmante autorizado de la campaña, sin duplicados.
 * Devuelve la lista de pubkeys válidas y únicas (para chequear contra el umbral).
 */
export function validReleaseSigners(
  signed: SignedAction[] | undefined,
  authorized: string[],
  challenge: string,
): string[] {
  if (!Array.isArray(signed)) return [];
  const allow = new Set(authorized);
  const seen = new Set<string>();
  const ok: string[] = [];
  for (const sa of signed) {
    if (!allow.has(sa?.signer)) continue;
    if (seen.has(sa.signer)) continue;
    if (!verifyFundingSignature(sa, challenge)) continue;
    seen.add(sa.signer);
    ok.push(sa.signer);
  }
  return ok;
}
