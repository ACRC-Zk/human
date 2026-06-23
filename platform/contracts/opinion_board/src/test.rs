//! Tests del contrato opinion_board (STUB).

#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Env};

#[test]
fn get_post_defaults_to_none() {
    let env = Env::default();
    let contract_id = env.register(OpinionBoard, ());
    let client = OpinionBoardClient::new(&env, &contract_id);

    assert!(client.get_post(&0).is_none());
}

// TODO: test post() de un autor verificado (mock del kyc_verifier) -> ok + id
// TODO: test post() de un autor NO verificado -> Error::NotVerified
// TODO: test address binding (require_auth)
