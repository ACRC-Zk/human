// Convierte los artefactos snarkjs (build/{verification_key,proof,public}.json) en un
// módulo Rust (identity/contracts/kyc_verifier/src/testdata.rs) que la suite de tests
// del contrato usa para verificar que la prueba "encaja con el groth16_verifier".
//
// Mapeo G2 (snarkjs -> ark): vk[*][0]=c0, vk[*][1]=c1  =>  (x_c0, x_c1, y_c0, y_c1).
//
// Uso: node scripts/gen_testdata.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const build = join(here, "..", "build");
const vk = JSON.parse(readFileSync(join(build, "verification_key.json")));
const proof = JSON.parse(readFileSync(join(build, "proof.json")));
const pub = JSON.parse(readFileSync(join(build, "public.json")));

const g1 = (p) => [p[0], p[1]];                 // [x, y]
const g2 = (p) => [p[0][0], p[0][1], p[1][0], p[1][1]]; // [x_c0, x_c1, y_c0, y_c1]

const strArr = (a) => "[" + a.map((s) => `"${s}"`).join(", ") + "]";
const icRust = "[\n" + vk.IC.map((p) => "        " + strArr(g1(p))).join(",\n") + ",\n    ]";

// public signals -> [u8;32] big-endian
const toBytes32 = (dec) => {
  let hex = BigInt(dec).toString(16).padStart(64, "0");
  if (hex.length > 64) throw new Error("field element > 32 bytes: " + dec);
  const bytes = [];
  for (let i = 0; i < 64; i += 2) bytes.push(parseInt(hex.slice(i, i + 2), 16));
  return bytes;
};
const bytesRust = (b) => "[" + b.join(", ") + "]";
const pubRust =
  "[\n" + pub.map((d) => "        " + bytesRust(toBytes32(d))).join(",\n") + ",\n    ]";

const out = `//! AUTO-GENERADO por identity/circuits/scripts/gen_testdata.mjs — NO editar a mano.
//!
//! Artefactos del pipeline ZK (curva BLS12-381) usados por la suite de tests del
//! contrato para comprobar que la prueba generada por Circom+snarkjs verifica con la
//! misma lógica de pairing del \`groth16_verifier\` oficial.
//!
//! Coordenadas como strings decimales (se parsean con ark-bls12-381 en los tests).
//! Public signals como bytes big-endian (32). Orden: [commitment, nullifier, issuerRoot, addressHash].

#![allow(dead_code)]

pub const VK_ALPHA: [&str; 2] = ${strArr(g1(vk.vk_alpha_1))};
pub const VK_BETA: [&str; 4] = ${strArr(g2(vk.vk_beta_2))};
pub const VK_GAMMA: [&str; 4] = ${strArr(g2(vk.vk_gamma_2))};
pub const VK_DELTA: [&str; 4] = ${strArr(g2(vk.vk_delta_2))};
pub const VK_IC: [[&str; 2]; ${vk.IC.length}] = ${icRust};

pub const PROOF_A: [&str; 2] = ${strArr(g1(proof.pi_a))};
pub const PROOF_B: [&str; 4] = ${strArr(g2(proof.pi_b))};
pub const PROOF_C: [&str; 2] = ${strArr(g1(proof.pi_c))};

/// [commitment, nullifier, issuerRoot, addressHash] como bytes big-endian (32 c/u).
pub const PUBLIC_SIGNALS: [[u8; 32]; 4] = ${pubRust};
`;

const dst = join(
  here, "..", "..", "contracts", "kyc_verifier", "src", "testdata.rs",
);
writeFileSync(dst, out);
console.log("OK: escrito", dst);
