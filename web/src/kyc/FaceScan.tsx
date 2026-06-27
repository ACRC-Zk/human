// Escaneo de cara en vivo (getUserMedia) + challenge para elicitar vivacidad.
// Captura varios frames; el liveness real lo evalúa el backend (parpadeo/giro).
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/Button";

const CHALLENGES = [
  "Mirá a la cámara",
  "Parpadeá un par de veces",
  "Girá la cabeza despacio a un lado y al otro",
];

export function FaceScan({ onCaptured }: { onCaptured: (frames: Blob[]) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState("Iniciando cámara…");
  const [prompt, setPrompt] = useState("");
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setStatus("Cámara lista");
      } catch (e) {
        setStatus("No se pudo acceder a la cámara: " + (e as Error).message);
      }
    })();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  function grabFrame(): Promise<Blob> {
    const v = videoRef.current!;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    canvas.getContext("2d")!.drawImage(v, 0, 0);
    return new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.9));
  }

  async function runScan() {
    setScanning(true);
    const frames: Blob[] = [];
    for (let i = 0; i < 12; i++) {
      setPrompt(CHALLENGES[Math.floor(i / 4) % CHALLENGES.length]);
      await new Promise((r) => setTimeout(r, 420));
      frames.push(await grabFrame());
    }
    setPrompt("Procesando…");
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onCaptured(frames);
  }

  return (
    <section className="bh-card">
      <p className="bh-eyebrow">Paso 3 de 3</p>
      <h2 className="bh-h2">Escaneo de cara</h2>
      <p className="bh-sub">{status}</p>
      <video ref={videoRef} playsInline muted className="bh-video" />
      {prompt && <p className="bh-note" style={{ fontWeight: 600, color: "var(--color-text)" }}>{prompt}</p>}
      <div className="bh-actions">
        <Button disabled={scanning} onClick={runScan}>
          {scanning ? "Escaneando…" : "Iniciar escaneo"}
        </Button>
      </div>
    </section>
  );
}
