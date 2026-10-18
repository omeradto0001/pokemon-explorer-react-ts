export default function FavoritesPage() {
  return (
    <div className="app-shell page-stack">
      <header className="page-header">
        <p className="eyebrow">Your collection</p>
        <h1>Favorites</h1>
        <p className="catalog-intro">
          Keep the Pokemon you love close at hand.
        </p>
      </header>
      <section className="empty-state" aria-labelledby="favorites-empty-title">
        <span className="empty-state__icon" aria-hidden="true">♥</span>
        <div>
          <h2 id="favorites-empty-title">No favorite Pokemon yet</h2>
          <p>Your saved Pokemon will appear here.</p>
        </div>
      </section>
    </div>
  )
}
