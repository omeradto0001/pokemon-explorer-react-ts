export default function ComparePage() {
  return (
    <div className="app-shell page-stack">
      <header className="page-header">
        <p className="eyebrow">Side by side</p>
        <h1>Compare</h1>
        <p className="catalog-intro">
          See how two Pokemon measure up against each other.
        </p>
      </header>
      <section className="empty-state" aria-labelledby="compare-empty-title">
        <span className="empty-state__icon empty-state__icon--compare" aria-hidden="true">
          ⇄
        </span>
        <div>
          <h2 id="compare-empty-title">Choose two Pokemon to compare</h2>
          <p>Your comparison will appear here.</p>
        </div>
      </section>
    </div>
  )
}
