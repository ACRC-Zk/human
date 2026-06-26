import { defineConfig } from "vitest/config";

// `forks`: aísla cada archivo en un proceso hijo. Necesario para snarkjs/ffjavascript
// (Workers anidados) y seguro para tfjs-node (addon nativo por proceso).
export default defineConfig({
  test: {
    pool: "forks",
    testTimeout: 60000,
  },
});
