pragma circom 2.1.6;

// ============================================================================
// beHuman — Circuito KYC (STUB / scaffolding)
//
// Prueba: "tengo una credencial KYC válida firmada por un issuer de confianza
// y cumplo el predicado X (ej. edad >= 18, país permitido)" — sin revelar PII.
//
// 📐 Diseño completo en la vault de Obsidian: `Diseño del Circuito ZK`, `Modelo de Datos`.
// Este archivo es un esqueleto: la lógica real se implementa más adelante.
// ============================================================================

// include "../node_modules/circomlib/circuits/poseidon.circom";
// include "../node_modules/circomlib/circuits/comparators.circom";
// include "../node_modules/circomlib/circuits/eddsaposeidon.circom";

template KycCredential() {
    // --- Inputs privados (witness) ---
    // signal input birthYear;        // PII — nunca sale del cliente
    // signal input countryCode;
    // signal input secret;           // semilla del usuario
    // signal input issuerSig[3];     // firma del issuer sobre el commitment

    // --- Inputs públicos ---
    // signal input issuerRoot;       // raíz/clave del issuer de confianza
    // signal input addressHash;      // hash del address Stellar (address binding)
    // signal input currentYear;      // anclado al ledger
    // signal input minAge;           // parámetro del predicado

    // --- Outputs públicos ---
    // signal output commitment;      // Poseidon(atributos, secret)
    // signal output nullifier;       // Poseidon(secret, addressHash) — anti doble registro

    // TODO: 1) verificar la firma del issuer sobre el commitment
    // TODO: 2) evaluar el predicado (edad >= minAge, país permitido)
    // TODO: 3) calcular y exponer commitment + nullifier
}

component main = KycCredential();
