// Datos declarados (testnet). En producción los atesta RENAPER/OCR.
// El nº de documento se usa SOLO para el de-dup (hash con pepper); nunca se guarda en claro.
import { useState } from "react";
import { Button } from "../components/ui/Button";

export interface AttributesInput {
  birthYear: number;
  countryCode: number; // ISO 3166-1 numérico (coincide con el circuito)
  docId: string;
}

const COUNTRIES = [
  { code: 32, name: "Argentina" },
  { code: 76, name: "Brasil" },
  { code: 152, name: "Chile" },
  { code: 858, name: "Uruguay" },
];

export function Attributes({ onNext }: { onNext: (a: AttributesInput) => void }) {
  const [birthYear, setBirthYear] = useState("");
  const [countryCode, setCountryCode] = useState(32);
  const [docId, setDocId] = useState("");

  const year = Number(birthYear);
  const valid = year >= 1900 && year <= 2026 && docId.trim().length >= 4;

  return (
    <section className="bh-card">
      <p className="bh-eyebrow">Paso 2 de 3</p>
      <h2 className="bh-h2">Tus datos</h2>
      <p className="bh-sub">
        El circuito sólo prueba <strong>mayor de edad</strong> y <strong>país permitido</strong> — los valores no se publican.
      </p>

      <label className="bh-field">
        <span className="bh-label">Año de nacimiento</span>
        <input className="bh-input" type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} placeholder="1995" />
      </label>
      <label className="bh-field">
        <span className="bh-label">País</span>
        <select className="bh-select" value={countryCode} onChange={(e) => setCountryCode(Number(e.target.value))}>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="bh-field">
        <span className="bh-label">Nº de documento</span>
        <input className="bh-input" value={docId} onChange={(e) => setDocId(e.target.value)} placeholder="12345678" />
      </label>

      <div className="bh-banner bh-banner--info">
        Ingresá los datos <strong>tal como figuran en tu DNI</strong> (año y nº exactos). Se
        <strong> cotejan contra la foto</strong>: si no coinciden o el documento no se llega a leer,
        volvé a subir una foto <strong>horizontal, centrada y con buena luz</strong>.
      </div>
      <div className="bh-actions">
        <Button disabled={!valid} onClick={() => onNext({ birthYear: year, countryCode, docId: docId.trim() })}>
          Cotejar con el DNI y continuar
        </Button>
      </div>
    </section>
  );
}
