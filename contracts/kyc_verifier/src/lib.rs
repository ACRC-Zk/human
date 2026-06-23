#![no_std]
//! beHuman — Contrato verificador KYC (STUB / scaffolding).
//!
//! Verifica una prueba ZK (Groth16) y registra la dirección como KYC-verificada,
//! garantizando "una persona = una identidad" mediante un `nullifier`.
//!
//! 📐 Diseño en la vault: `Contrato Verificador (Soroban)`, `Flujo de KYC` (Fase 3).
//! Punto de partida: `groth16_verifier` de soroban-examples.

use soroban_sdk::{contract, contracterror, contractimpl, Address, BytesN, Env, Vec};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    UntrustedIssuer = 1,
    AddressMismatch = 2,
    NullifierAlreadyUsed = 3,
    InvalidProof = 4,
}

#[contract]
pub struct KycVerifier;

#[contractimpl]
impl KycVerifier {
    /// Verifica la prueba y registra `address` como verificada.
    ///
    /// Pasos (a implementar — ver `Flujo de KYC` Fase 3 en la vault):
    /// 1. `issuer_root` ∈ confiables
    /// 2. `address == invoker` (address binding) -> `address.require_auth()`
    /// 3. `nullifier` no usado antes
    /// 4. `verify_groth16(vk, proof, public_inputs)`
    /// 5. registrar address = verificado + guardar nullifier
    pub fn verify_and_register(
        _env: Env,
        _address: Address,
        _proof: BytesN<256>,
        _public_inputs: Vec<BytesN<32>>,
    ) -> Result<(), Error> {
        // TODO: implementar
        Ok(())
    }

    /// Consulta que usan las dApps: ¿está verificada esta dirección?
    pub fn is_verified(_env: Env, _address: Address) -> bool {
        // TODO: leer del storage
        false
    }
}

#[cfg(test)]
mod test;
