# beHuman — atajos de desarrollo del monorepo.
# Scaffolding: muchos targets son stubs hasta que implementemos cada parte.

.PHONY: help install web-dev contract-build circuit-compile circuit-setup \
        circuit-prove deploy e2e test clean

help: ## Muestra esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## Instala los workspaces JS (web, issuer, packages/*)
	npm install

web-dev: ## Levanta el frontend React (web/)
	npm run dev --workspace web

contract-build: ## Compila el contrato Soroban a wasm
	cd contracts && stellar contract build

circuit-compile: ## Compila el circuito Circom
	bash circuits/scripts/compile.sh

circuit-setup: ## Trusted setup (powers of tau + zkey)
	bash circuits/scripts/setup.sh

circuit-prove: ## Genera una prueba de ejemplo
	bash circuits/scripts/prove.sh

deploy: ## Despliega el contrato a testnet
	bash scripts/deploy_testnet.sh

e2e: ## Corre la demo end-to-end (lo que graba el video)
	bash scripts/e2e_demo.sh

test: ## Corre los tests de todos los componentes
	npm run test --workspaces --if-present
	cd contracts && cargo test

clean: ## Limpia artefactos de build
	rm -rf node_modules **/node_modules **/dist contracts/target circuits/build
