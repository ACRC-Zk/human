// beHuman — Issuer KYC mock (STUB / scaffolding).
// Firma credenciales de prueba. La PII nunca toca la cadena.
// 📐 Ver `Flujo de KYC` (Fase 1) y `Modelo de Datos` en la vault.

export interface IdentityAttributes {
  birthYear: number;
  countryCode: string;
  // ...otros atributos de KYC
}

export interface KycCredential {
  commitment: string; // Poseidon(atributos, secret)
  signature: string; // firma del issuer
  attributes: IdentityAttributes;
}

/**
 * Emite (firma) una credencial KYC de prueba. STUB.
 * TODO: calcular Poseidon(commitment) y firmar con la clave del issuer.
 */
export function issueCredential(_attrs: IdentityAttributes, _secret: string): KycCredential {
  throw new Error("issuer mock no implementado todavía — ver vault: Flujo de KYC (Fase 1)");
}

console.log("beHuman issuer (mock) — scaffolding. Implementar issueCredential().");
