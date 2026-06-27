// Pantalla de consentimiento informado (Ley 25.326): debe constar ANTES de capturar
// DNI/biometría. Ver Cumplimiento-Argentina en la vault.
import { Button } from "../components/ui/Button";

export function Consent({ onAccept }: { onAccept: () => void }) {
  return (
    <section className="bh-card">
      <p className="bh-eyebrow">Privacidad primero</p>
      <h2 className="bh-h2">Antes de empezar</h2>
      <p className="bh-p">
        Para verificar que sos una persona real y única vamos a pedirte una{" "}
        <strong>foto de tu DNI</strong> y un <strong>escaneo de tu cara</strong> con la cámara.
      </p>
      <ul className="bh-list">
        <li>Las imágenes se procesan <strong>en el momento</strong> y no se guardan.</li>
        <li>
          <strong>Nada de tus datos</strong> (cara, documento, nombre) toca la blockchain:
          on-chain solo va una prueba criptográfica anónima.
        </li>
        <li>Podés ejercer tus derechos de acceso y supresión (Ley 25.326).</li>
      </ul>
      <p className="bh-note bh-note--warn">
        ⚠️ Demo testnet: la verificación biométrica es un matcher de prueba (no RENAPER).
      </p>
      <div className="bh-actions">
        <Button onClick={onAccept}>Acepto y continúo</Button>
      </div>
    </section>
  );
}
