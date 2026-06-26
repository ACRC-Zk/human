// Wrapper de DeFindex (yield en Blend) — https://docs.defindex.io
//
// Provider configurable:
//  - "real": pega a la API de DeFindex (api.defindex.io) con API key (Bearer). Patrón: la API
//    arma la tx (XDR), el donante firma con su wallet anónima, se envía a POST /send. La red
//    se pasa como `?network=` en cada request.
//  - "dev": mock determinístico para construir/testear el flujo sin depender de testnet.
//
// El wrapper es un ADAPTADOR sin estado de campaña; el bookkeeping de donaciones/shares lo
// lleva funding/api. Shapes "real" VALIDADAS contra el OpenAPI de api.defindex.io (/api-json)
// y un depósito real ejecutado en testnet contra el vault XLM oficial.
//
// Convenciones de unidades: `amount` entra en unidades del activo (XLM); DeFindex usa
// stroops (1 XLM = 1e7). `apy` de la API viene en PORCENTAJE (13.23) → se normaliza a
// fracción (0.1323) para ser consistente con el resto del cálculo de yield.
import type { VaultPosition } from "@behuman/shared";

export type FundingProviderKind = "real" | "dev";
export type StellarNetwork = "testnet" | "mainnet" | "public";

export interface DefindexConfig {
  provider: FundingProviderKind;
  apiUrl: string;
  apiKey?: string;
  network?: StellarNetwork; // default: testnet
}

const STROOPS = 10_000_000; // 1e7
const toStroops = (amount: string): number => Math.round(Number(amount) * STROOPS);
const fromStroops = (s: string | number): string => (Number(s) / STROOPS).toString();

export interface Defindex {
  readonly provider: FundingProviderKind;
  /** Arma la tx de depósito (XDR a firmar por la wallet anónima). */
  buildDeposit(vault: string, from: string, amount: string): Promise<{ xdr: string }>;
  /** Arma la tx de retiro de `shares` (refund / release). */
  buildWithdraw(vault: string, who: string, shares: string): Promise<{ xdr: string }>;
  /** Envía un XDR ya firmado. Devuelve el hash. */
  send(signedXdr: string): Promise<{ hash: string }>;
  /** Posición del titular en el vault (shares + valor subyacente + apy). */
  balance(vault: string, who: string): Promise<VaultPosition>;
  apy(vault: string): Promise<number>;
}

export function createDefindex(cfg: DefindexConfig): Defindex {
  return cfg.provider === "real" ? realDefindex(cfg) : devDefindex(cfg);
}

// ─── real ────────────────────────────────────────────────────────────────────
function realDefindex(cfg: DefindexConfig): Defindex {
  const base = cfg.apiUrl.replace(/\/$/, "");
  const net = cfg.network ?? "testnet";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cfg.apiKey) headers.Authorization = `Bearer ${cfg.apiKey}`;
  const q = (path: string) => `${base}${path}${path.includes("?") ? "&" : "?"}network=${net}`;

  async function post(path: string, body: unknown): Promise<any> {
    const res = await fetch(q(path), { method: "POST", headers, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`defindex ${path} -> HTTP ${res.status} ${await res.text().catch(() => "")}`);
    return res.json();
  }
  async function get(path: string): Promise<any> {
    const res = await fetch(q(path), { headers });
    if (!res.ok) throw new Error(`defindex ${path} -> HTTP ${res.status}`);
    return res.json();
  }

  return {
    provider: "real",
    // POST /vault/{address}/deposit { amounts:[stroops], caller } -> { xdr }
    async buildDeposit(vault, from, amount) {
      const r = await post(`/vault/${vault}/deposit`, { amounts: [toStroops(amount)], caller: from });
      return { xdr: r.xdr };
    },
    // POST /vault/{address}/withdraw { amounts:[stroops], caller } -> { xdr }
    async buildWithdraw(vault, who, shares) {
      const r = await post(`/vault/${vault}/withdraw`, { amounts: [toStroops(shares)], caller: who });
      return { xdr: r.xdr };
    },
    // POST /send { xdr } -> { txHash, success }
    async send(signedXdr) {
      const r = await post(`/send`, { xdr: signedXdr });
      if (r.success === false) throw new Error(`defindex /send falló: ${JSON.stringify(r).slice(0, 200)}`);
      return { hash: String(r.txHash ?? r.hash ?? "") };
    },
    // GET /vault/{address}/balance?from= -> { dfTokens, underlyingBalance:[stroops] }
    async balance(vault, who) {
      const r = await get(`/vault/${vault}/balance?from=${encodeURIComponent(who)}`);
      const underlying = Array.isArray(r.underlyingBalance) ? r.underlyingBalance[0] : r.underlyingBalance;
      return {
        shares: String(r.dfTokens ?? "0"),
        underlying: fromStroops(underlying ?? 0),
        apy: await this.apy(vault),
      };
    },
    // GET /vault/{address}/apy -> { apy: <porcentaje> }  →  fracción
    async apy(vault) {
      const r = await get(`/vault/${vault}/apy`);
      return Number(r.apy ?? 0) / 100;
    },
  };
}

// ─── dev (mock determinístico) ────────────────────────────────────────────────
// No pega a la red. Devuelve XDR/hashes simulados; el yield se modela con un APY fijo.
// El estado real de las posiciones lo lleva funding/api (este mock es sin estado).
const DEV_APY = 0.08; // 8% anual simulado

function devDefindex(_cfg: DefindexConfig): Defindex {
  const fakeXdr = (tag: string) => `DEV_XDR:${tag}:${Date.now().toString(36)}`;
  const fakeHash = () => "dev" + Math.random().toString(16).slice(2, 12);
  return {
    provider: "dev",
    async buildDeposit(vault, from, amount) {
      return { xdr: fakeXdr(`deposit:${vault}:${from}:${amount}`) };
    },
    async buildWithdraw(vault, who, shares) {
      return { xdr: fakeXdr(`withdraw:${vault}:${who}:${shares}`) };
    },
    async send() {
      return { hash: fakeHash() };
    },
    async balance(_vault, _who) {
      // sin estado: funding/api computa la posición real en dev. Devuelve apy de referencia.
      return { shares: "0", underlying: "0", apy: DEV_APY };
    },
    async apy() {
      return DEV_APY;
    },
  };
}

export { DEV_APY };
