// Anti-fraude: cotejo de datos declarados vs. OCR del DNI (lógica pura, sin OCR real).
import { describe, it, expect } from "vitest";
import { crossCheckData, type DocAnalysis } from "../documentCheck.js";

// DNI argentino "leído" por OCR: nº 12.345.678, nacido 1990, ARGENTINA.
const dni: DocAnalysis = {
  hasFace: true,
  text: "REPUBLICA ARGENTINA DOCUMENTO NACIONAL DE IDENTIDAD 12.345.678 NACIMIENTO 1990",
  tokens: 30,
  keywordsFound: 5,
  hasDocNumber: true,
  docNumbers: ["12345678"],
  years: [1990, 2015],
};

describe("crossCheckData (anti-fraude)", () => {
  it("acepta cuando los datos coinciden", () => {
    const r = crossCheckData(dni, { birthYear: 1990, docId: "12345678", countryCode: 32 });
    expect(r.ok).toBe(true);
    expect(r.mismatches).toEqual([]);
  });

  it("acepta el nº con puntos declarados", () => {
    const r = crossCheckData(dni, { birthYear: 1990, docId: "12.345.678", countryCode: 32 });
    expect(r.ok).toBe(true);
  });

  it("rebota si el año de nacimiento no coincide", () => {
    const r = crossCheckData(dni, { birthYear: 1985, docId: "12345678", countryCode: 32 });
    expect(r.ok).toBe(false);
    expect(r.mismatches).toContain("birth_year");
  });

  it("rebota si el nº de documento no coincide", () => {
    const r = crossCheckData(dni, { birthYear: 1990, docId: "87654321", countryCode: 32 });
    expect(r.ok).toBe(false);
    expect(r.mismatches).toContain("doc_number");
  });

  it("rebota si se declara otro país y el DNI dice otro", () => {
    const r = crossCheckData(dni, { birthYear: 1990, docId: "12345678", countryCode: 76 }); // Brasil
    expect(r.ok).toBe(false);
    expect(r.mismatches).toContain("country");
  });

  it("no penaliza el país si el OCR no detecta ninguno conocido", () => {
    const noCountry: DocAnalysis = { ...dni, text: "DOCUMENTO 12.345.678 NACIMIENTO 1990" };
    const r = crossCheckData(noCountry, { birthYear: 1990, docId: "12345678", countryCode: 76 });
    expect(r.mismatches).not.toContain("country");
  });

  it("acumula múltiples mismatches", () => {
    const r = crossCheckData(dni, { birthYear: 1970, docId: "99999999", countryCode: 32 });
    expect(r.mismatches).toEqual(expect.arrayContaining(["doc_number", "birth_year"]));
  });
});
