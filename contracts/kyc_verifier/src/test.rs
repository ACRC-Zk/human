//! Tests del contrato kyc_verifier (STUB).
//! Ver `Contract Testing` en docs de Stellar y `09 - Tools/Plan de armado con IA`.

#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Env};

#[test]
fn is_verified_defaults_to_false() {
    let env = Env::default();
    let contract_id = env.register(KycVerifier, ());
    let client = KycVerifierClient::new(&env, &contract_id);

    let address = Address::generate(&env);
    assert_eq!(client.is_verified(&address), false);
}

// TODO: test de verify_and_register (happy path)
// TODO: test de doble registro (nullifier ya usado) -> Error::NullifierAlreadyUsed
// TODO: test de address binding -> Error::AddressMismatch
// TODO: test de issuer no confiable -> Error::UntrustedIssuer
