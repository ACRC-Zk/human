// Subida de la foto del DNI (frente, con la cara visible).
// Valida en el backend que SEA un documento de identidad antes de habilitar el escaneo.
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { checkDocument } from "./api";

type Status =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "ok" }
  | { kind: "invalid"; reasons: string[] }
  | { kind: "error"; message: string };

const REASON_TEXT: Record<string, string> = {
  not_an_id_document: "La imagen no parece un documento de identidad (DNI).",
  no_face_in_document: "No se detecta una cara en el documento.",
};

export function DocumentUpload({
  onNext,
  notice,
}: {
  onNext: (doc: Blob) => void;
  notice?: string | null;
}) {
  const [doc, setDoc] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setDoc(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    if (!file) return setStatus({ kind: "idle" });

    setStatus({ kind: "checking" });
    try {
      const res = await checkDocument(file);
      setStatus(res.ok ? { kind: "ok" } : { kind: "invalid", reasons: res.reasons });
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  return (
    <section className="bh-card">
      <p className="bh-eyebrow">Paso 1 de 3</p>
      <h2 className="bh-h2">Foto del DNI</h2>
      <p className="bh-sub">
        Subí una foto del <strong>frente de tu documento</strong> donde se vea tu cara.
      </p>
      {notice && <div className="bh-banner bh-banner--warn">⚠️ {notice}</div>}

      <input className="bh-input" type="file" accept="image/*" onChange={onPick} />
      {preview && <img src={preview} alt="DNI" className="bh-preview" />}

      {status.kind === "checking" && <p className="bh-note">Verificando que sea un documento…</p>}
      {status.kind === "ok" && <p className="bh-note bh-note--ok">✅ Documento válido.</p>}
      {status.kind === "invalid" && (
        <div className="bh-note bh-note--err">
          <p>❌ No es un documento de identidad válido. Subí una foto del DNI.</p>
          <ul className="bh-list">
            {status.reasons.map((r) => (
              <li key={r}>{REASON_TEXT[r] ?? r}</li>
            ))}
          </ul>
        </div>
      )}
      {status.kind === "error" && <p className="bh-note bh-note--err">Error: {status.message}</p>}

      <div className="bh-actions">
        <Button disabled={!doc || status.kind !== "ok"} onClick={() => doc && onNext(doc)}>
          Continuar a tus datos
        </Button>
      </div>
    </section>
  );
}
