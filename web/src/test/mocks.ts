import { vi } from "vitest";

vi.mock("@stellar/freighter-api", () => ({
  default: {
    isConnected: vi.fn(async () => false),
    requestAccess: vi.fn(async () => "GTEST"),
    getAddress: vi.fn(async () => "GTEST"),
    signTransaction: vi.fn(),
    signAuthEntry: vi.fn(),
    signMessage: vi.fn(),
    getNetwork: vi.fn(async () => "TESTNET"),
  },
}));

vi.mock("@creit.tech/stellar-wallets-kit", () => ({
  StellarWalletsKit: vi.fn().mockImplementation(() => ({
    openModal: vi.fn(),
    setWallet: vi.fn(),
    getAddress: vi.fn(async () => ({ address: "GTEST" })),
  })),
  WalletNetwork: { TESTNET: "TESTNET" },
  allowAllModules: vi.fn(() => []),
  FREIGHTER_ID: "freighter",
}));
