// E2E de la Capa 1 (testnet): identidad -> prueba ZK -> verify_and_register -> is_verified.
//
// Simula al issuer construyendo el árbol con el SDK (la lógica de enroll/gate está
// testeada aparte en identity/issuer). Foco: validar el pipeline ON-CHAIN real.
//
// Env: CONTRACT_ID, SIGNER_SECRET, RPC_URL, NETWORK_PASSPHRASE.
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as StellarSdk from "@stellar/stellar-sdk";
import {
  poseidon3,
  buildTree,
  merkleProof,
  generateProof,
  initVerifier,
  verifyAndRegister,
  isVerified,
  circuitsBuildDir,
} from "@behuman/sdk";
import type { Capa1Credential } from "@behuman/shared";

const env = (k: string) => {
  const v = process.env[k];
  if (!v) throw new Error(`falta env ${k}`);
  return v;
};

const cfg = {
  rpcUrl: env("RPC_URL"),
  networkPassphrase: env("NETWORK_PASSPHRASE"),
  contractId: env("CONTRACT_ID"),
};
const signerSecret = env("SIGNER_SECRET");
const address = StellarSdk.Keypair.fromSecret(signerSecret).publicKey();

function randomField(): string {
  // 31 bytes < r_bls12381
  return BigInt("0x" + randomBytes(31).toString("hex")).toString();
}

async function main() {
  console.log("== beHuman · E2E Capa 1 (testnet) ==");
  console.log("address:", address);

  // 1) Identidad de Capa 1 (no-custodial): secret + atributos -> commitment.
  const secret = randomField();
  const attributes = { birthYear: 1995, countryCode: 32 }; // mayor de edad, AR
  const commitment = await poseidon3(attributes.birthYear, attributes.countryCode, secret);
  console.log("[1] commitment generado");

  // 2) Issuer: árbol de humanos verificados + camino de inclusión.
  const tree = await buildTree([commitment]);
  const path = merkleProof(tree, 0);
  const credential: Capa1Credential = {
    attributes,
    secret,
    commitment: commitment.toString(),
    issuerRoot: tree.root.toString(),
    pathElements: path.pathElements.map(String),
    pathIndices: path.pathIndices,
  };
  console.log("[2] issuerRoot:", tree.root.toString().slice(0, 16) + "…");

  // 3) Prueba ZK off-chain (la PII/secret nunca sale).
  const gen = await generateProof(credential, address);
  console.log("[3] prueba ZK generada; publicSignals:", gen.publicSignals.length);

  // 4) init del contrato con el issuerRoot de confianza + VK.
  const vk = JSON.parse(readFileSync(resolve(circuitsBuildDir(), "verification_key.json"), "utf8"));
  try {
    const initHash = await initVerifier(cfg, signerSecret, tree.root.toString(), vk);
    console.log("[4] init OK:", initHash);
  } catch (e) {
    console.log("[4] init omitido:", (e as Error).message);
  }

  // 5) verify_and_register on-chain.
  const txHash = await verifyAndRegister(cfg, signerSecret, gen);
  console.log("[5] verify_and_register OK:", txHash);

  // 6) is_verified(address) -> debe ser true.
  const ok = await isVerified(cfg, address);
  console.log("[6] is_verified:", ok);
  if (!ok) throw new Error("is_verified devolvió false");
  console.log("\n✅ E2E OK — Verified(address) en testnet");
}

main().catch((e) => {
  console.error("❌ E2E falló:", e.message);
  process.exit(1);
});
