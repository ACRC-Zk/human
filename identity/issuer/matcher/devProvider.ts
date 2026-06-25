// DevProvider — provider de DESARROLLO/TEST. NO usar nunca en producción.
//
// Aprueba el gate sin biometría real. Sirve para: (a) tests de la lógica de enroll /
// de-dup / árbol, y (b) e2e automatizado del pipeline on-chain sin cámara. El gate
// biométrico real se prueba con MatcherTestnetProvider (ver matcher/__tests__).
import type { MatchResult } from "@behuman/shared";
import type { GateInput, IdentityProvider } from "./provider.js";

export class DevProvider implements IdentityProvider {
  readonly kind = "dev" as const;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async verifyIdentity(_input: GateInput): Promise<MatchResult> {
    return { ok: true, matchScore: 1, matchDistance: 0, livenessOk: true, reasons: [] };
  }
}
