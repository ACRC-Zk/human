import "./App.css";

// beHuman — Frontend (scaffolding). El flujo real se implementa más adelante.
// 📐 Pasos del usuario en la vault: `Flujo de KYC`.

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>beHuman</h1>
        <p className="app__tagline">KYC con Zero-Knowledge sobre Stellar</p>
      </header>

      <section className="app__card">
        <p>
          Probá que sos una persona <strong>real y única</strong> sin revelar quién sos.
        </p>
        <ol className="app__steps">
          <li>Verificá tu identidad con el issuer (una vez)</li>
          <li>Generá tu prueba ZK en este dispositivo</li>
          <li>Registrate on-chain en Stellar — sin exponer tus datos</li>
        </ol>
        <button type="button" disabled>
          Comenzar (próximamente)
        </button>
      </section>

      <footer className="app__footer">
        scaffolding · ver <code>docs/</code> y la vault de Obsidian
      </footer>
    </main>
  );
}

export default App;
