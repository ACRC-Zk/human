// Genera identity/circuits/input.json para el circuito kyc.circom.
//
// El addressHash DEBE coincidir con el que el contrato calcula on-chain a partir
// del address del invocador (sha256(address.to_xdr()) reducido mod r_bls12381).
// Por eso se pasa como argumento: el valor canónico se obtiene del contrato
// (ver test `print_address_hash` en identity/contracts/kyc_verifier).
//
// Uso:
//   node scripts/gen_input.mjs <addressHashDecimal>
//
// Notas de diseño (MVP / mock issuer):
//  - Los `pathElements` (siblings Merkle) son valores arbitrarios: definen
//    implícitamente el árbol del issuer. El `issuerRoot` resultante sale como
//    public signal y es el que el contrato guarda como `trusted_root`.
//  - birthYear/countryCode satisfacen el predicado (mayor de edad + país permitido).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const addressHash = process.argv[2];
if (!addressHash) {
  console.error("ERROR: falta addressHash. Uso: node scripts/gen_input.mjs <addressHashDecimal>");
  process.exit(1);
}

const input = {
  // --- privados (PII + secreto) ---
  birthYear: "1995",        // mayor de 18 respecto a CURRENT_YEAR=2026
  countryCode: "32",        // AR (ISO 3166-1 numérico) — país permitido
  secret: "1234567890123456789012345678901234567890",
  // camino Merkle (profundidad 4). Siblings arbitrarios = árbol mock del issuer.
  pathElements: [
    "11111111111111111111111111111111",
    "22222222222222222222222222222222",
    "33333333333333333333333333333333",
    "44444444444444444444444444444444",
  ],
  pathIndices: ["0", "1", "0", "1"],
  // --- público ---
  addressHash: String(addressHash),
};

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "input.json");
writeFileSync(out, JSON.stringify(input, null, 2) + "\n");
console.log("OK: escrito", out);
console.log(JSON.stringify(input, null, 2));
