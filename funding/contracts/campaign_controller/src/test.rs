//! Tests de campaign_controller. Usa un SAC de testutils como activo (simula XLM/USDC).
//! Verifica las reglas no-custodiales: release 2-de-3 + meta, refund todo-o-nada.

#![cfg(test)]
extern crate std;

use super::*;
use soroban_sdk::{
    testutils::{Address as _, Ledger as _},
    token, vec, Address, Env,
};

struct Fixture<'a> {
    env: Env,
    client: CampaignControllerClient<'a>,
    token: token::Client<'a>,
    token_admin: token::StellarAssetClient<'a>,
    cause: Address,
    signers: Vec<Address>, // [causa, plataforma, neutral]
}

fn setup(goal: i128, deadline: u64) -> Fixture<'static> {
    let env = Env::default();
    env.mock_all_auths();

    let sac_admin = Address::generate(&env);
    let sac = env.register_stellar_asset_contract_v2(sac_admin);
    let asset = sac.address();
    let token = token::Client::new(&env, &asset);
    let token_admin = token::StellarAssetClient::new(&env, &asset);

    let cause = Address::generate(&env);
    let s_cause = Address::generate(&env);
    let s_platform = Address::generate(&env);
    let s_neutral = Address::generate(&env);
    let signers = vec![&env, s_cause.clone(), s_platform.clone(), s_neutral.clone()];

    let client = CampaignControllerClient::new(&env, &env.register(CampaignController, ()));
    client.init(&asset, &cause, &goal, &deadline, &signers);

    Fixture { env, client, token, token_admin, cause, signers }
}

fn donor(f: &Fixture, funded: i128) -> Address {
    let d = Address::generate(&f.env);
    f.token_admin.mint(&d, &funded);
    d
}

#[test]
fn donate_accumulates() {
    let f = setup(100, 1_000_000);
    let a = donor(&f, 100);
    let b = donor(&f, 100);
    f.client.donate(&a, &60);
    f.client.donate(&b, &50);
    assert_eq!(f.client.raised(), 110);
    assert_eq!(f.client.contribution(&a), 60);
    assert_eq!(f.token.balance(&f.client.address), 110);
}

#[test]
fn release_2_of_3_pays_cause() {
    let f = setup(100, 1_000_000);
    let a = donor(&f, 100);
    let b = donor(&f, 100);
    f.client.donate(&a, &60);
    f.client.donate(&b, &50); // raised 110 >= 100
    let two = vec![&f.env, f.signers.get(0).unwrap(), f.signers.get(1).unwrap()];
    f.client.release(&two);
    assert_eq!(f.client.state(), State::Released);
    assert_eq!(f.token.balance(&f.cause), 110); // capital a la causa
    assert_eq!(f.token.balance(&f.client.address), 0);
}

#[test]
fn release_needs_two_signers() {
    let f = setup(100, 1_000_000);
    let a = donor(&f, 100);
    f.client.donate(&a, &100);
    let one = vec![&f.env, f.signers.get(1).unwrap()];
    assert_eq!(f.client.try_release(&one), Err(Ok(Error::NeedTwoOfThree)));
}

#[test]
fn release_rejects_non_signer() {
    let f = setup(100, 1_000_000);
    let a = donor(&f, 100);
    f.client.donate(&a, &100);
    let outsider = Address::generate(&f.env);
    let bad = vec![&f.env, f.signers.get(0).unwrap(), outsider];
    assert_eq!(f.client.try_release(&bad), Err(Ok(Error::NotASigner)));
}

#[test]
fn release_rejects_duplicate_signer() {
    let f = setup(100, 1_000_000);
    let a = donor(&f, 100);
    f.client.donate(&a, &100);
    let dup = vec![&f.env, f.signers.get(0).unwrap(), f.signers.get(0).unwrap()];
    assert_eq!(f.client.try_release(&dup), Err(Ok(Error::DuplicateSigner)));
}

#[test]
fn release_rejects_below_goal() {
    let f = setup(1000, 1_000_000);
    let a = donor(&f, 100);
    f.client.donate(&a, &40);
    let two = vec![&f.env, f.signers.get(0).unwrap(), f.signers.get(1).unwrap()];
    assert_eq!(f.client.try_release(&two), Err(Ok(Error::GoalNotReached)));
}

#[test]
fn refund_all_or_nothing_after_deadline() {
    let f = setup(1000, 100); // meta alta, deadline temprano
    let a = donor(&f, 100);
    let b = donor(&f, 100);
    f.client.donate(&a, &40);
    f.client.donate(&b, &30); // raised 70 < 1000 -> fallará
    f.env.ledger().set_timestamp(200); // pasa el deadline

    f.client.refund(&a);
    assert_eq!(f.token.balance(&a), 100); // recuperó su aporte
    assert_eq!(f.client.state(), State::Refunding);
    assert_eq!(f.client.contribution(&a), 0);
    // doble refund -> nada que devolver
    assert_eq!(f.client.try_refund(&a), Err(Ok(Error::NothingToRefund)));
    // b también recupera
    f.client.refund(&b);
    assert_eq!(f.token.balance(&b), 100);
    assert_eq!(f.client.raised(), 0);
}

#[test]
fn refund_rejected_before_failure() {
    let f = setup(100, 1_000_000); // deadline lejano
    let a = donor(&f, 100);
    f.client.donate(&a, &40);
    assert_eq!(f.client.try_refund(&a), Err(Ok(Error::CampaignNotFailed)));
}

#[test]
fn no_donate_after_release() {
    let f = setup(100, 1_000_000);
    let a = donor(&f, 200);
    f.client.donate(&a, &100);
    let two = vec![&f.env, f.signers.get(0).unwrap(), f.signers.get(1).unwrap()];
    f.client.release(&two);
    assert_eq!(f.client.try_donate(&a, &10), Err(Ok(Error::NotFundraising)));
}

#[test]
fn rejects_double_init() {
    let f = setup(100, 1_000_000);
    let res = f.client.try_init(&f.token.address, &f.cause, &100, &1_000_000, &f.signers);
    assert_eq!(res, Err(Ok(Error::AlreadyInitialized)));
}
