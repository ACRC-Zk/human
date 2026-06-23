#![no_std]
//! beHuman — opinion_board (CAPA 2, STUB / scaffolding).
//!
//! Ancla on-chain de la plataforma de opinión. NO guarda el contenido (eso va off-chain en
//! `platform/api`): guarda la prueba de que *"este post lo escribió una persona verificada
//! y única, y su contenido es el del hash X"*.
//!
//! 🌉 El puente con la CAPA 1: antes de aceptar un post, consulta `is_verified(author)` en
//! el contrato `kyc_verifier`. Es la única dependencia entre capas.
//!
//! 📐 Diseño en la vault: `Plataforma de Opinión Verificada`, `Curaduría y Agentes
//! Validadores`, `Identidad Pública vs Anónima`.

use soroban_sdk::{contract, contracterror, contractimpl, contracttype, Address, BytesN, Env};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    NotVerified = 1, // el autor no pasó el KYC (is_verified == false)
    NotInitialized = 2,
}

#[contracttype]
pub enum DataKey {
    KycVerifier,      // Address del contrato kyc_verifier (CAPA 1)
    PostCount,        // u64 — id incremental
    Post(u64),        // u64 -> Record del post
}

#[contracttype]
#[derive(Clone)]
pub struct PostRecord {
    pub author: Address,        // seudónimo estable (verificado, sin PII)
    pub content_hash: BytesN<32>, // hash del contenido off-chain
    pub timestamp: u64,
}

#[contract]
pub struct OpinionBoard;

#[contractimpl]
impl OpinionBoard {
    /// Guarda la dirección del contrato kyc_verifier (CAPA 1) al desplegar.
    pub fn init(env: Env, kyc_verifier: Address) {
        env.storage().instance().set(&DataKey::KycVerifier, &kyc_verifier);
    }

    /// Publica un post: ancla autor verificado + hash del contenido.
    ///
    /// Pasos (a implementar):
    /// 1. `author.require_auth()` (address binding)
    /// 2. cross-contract: `KycVerifierClient::is_verified(author)` -> debe ser true
    /// 3. guardar PostRecord { author, content_hash, timestamp } y devolver el id
    pub fn post(_env: Env, _author: Address, _content_hash: BytesN<32>) -> Result<u64, Error> {
        // TODO: gating con is_verified + storage del PostRecord
        Err(Error::NotInitialized)
    }

    /// Lee un post anclado por id. STUB.
    pub fn get_post(_env: Env, _id: u64) -> Option<PostRecord> {
        // TODO: leer del storage
        None
    }
}

#[cfg(test)]
mod test;
