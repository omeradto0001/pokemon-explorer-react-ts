import { Link, useParams } from 'react-router-dom'
import PokemonList from '../components/PokemonList'
import { pokemon } from '../data/pokemon'

export default function PokemonDetailsPage() {
  const { id } = useParams()
  const pokemonId = Number(id)
  const selectedPokemon = Number.isInteger(pokemonId)
    ? pokemon.find((item) => item.id === pokemonId)
    : undefined

  return (
    <div className="app-shell detail-page">
      {selectedPokemon ? (
        <article className="pokemon-detail">
          <div className="pokemon-detail__visual">
            <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} />
          </div>
          <div className="pokemon-detail__content">
            <Link className="back-link" to="/pokemon">
              <span aria-hidden="true">←</span> Back to catalog
            </Link>
            <p className="eyebrow">
              Pokemon #{String(selectedPokemon.id).padStart(3, '0')}
            </p>
            <h1>{selectedPokemon.name}</h1>
            <p className="catalog-intro">
              More details will arrive when the live PokeAPI data is connected.
            </p>
          </div>
        </article>
      ) : (
        <section className="empty-state" aria-labelledby="pokemon-not-found-title">
          <span className="empty-state__icon empty-state__icon--not-found" aria-hidden="true">
            ?
          </span>
          <div>
            <h1 id="pokemon-not-found-title">Pokemon not found</h1>
            <p>There is no Pokemon with this identifier in the local collection.</p>
            <Link className="text-link" to="/pokemon">Return to the catalog</Link>
          </div>
        </section>
      )}

      <section className="related-pokemon" aria-labelledby="related-pokemon-title">
        <div className="section-heading">
          <p className="eyebrow">Local collection</p>
          <h2 id="related-pokemon-title">Choose another Pokemon</h2>
        </div>
        <PokemonList pokemon={pokemon} />
      </section>
    </div>
  )
}
