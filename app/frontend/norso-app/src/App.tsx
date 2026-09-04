import './App.css'

function App() {
  return (
    <main className="app-home">
      <nav className="topbar" aria-label="Brand">
        <a className="brand" href="/" aria-label="Norso home">
          <NorsoMark />
          <span>norso</span>
        </a>
      </nav>

      <section className="hero-shell" aria-label="Workspace hero">
        <div className="hero-visual" aria-hidden="true">
          <div className="orbital-grid"></div>
          <div className="logo-layer logo-layer-back"></div>
          <div className="logo-layer logo-layer-mid"></div>
          <div className="logo-stage">
            <NorsoMark />
          </div>
        </div>

        <div className="hero-copy">
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button primary" href="#">Open Workspace</a>
          </div>
        </div>
      </section>
    </main>
  )
}

function NorsoMark() {
  return (
    <svg className="norso-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Norso mark">
      <path d="M32 104V24h12l52 58V24h12v80H96L44 46v58z" fill="currentColor" />
    </svg>
  )
}

export default App
