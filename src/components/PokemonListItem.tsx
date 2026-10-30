import { NavLink, useLocation } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import type { PokemonSummary } from '../types/pokemon'

type PokemonListItemProps = {
  pokemon: PokemonSummary
}

export default function PokemonListItem({ pokemon }: PokemonListItemProps) {
  const location = useLocation()
  const { isFavorite, toggleFavorite } = useFavorites()
  const detailPath = `/pokemon/${pokemon.id}`
  const favorite = isFavorite(pokemon.id)

  return (
    <article className={`pokemon-list-item${location.pathname === detailPath ? ' pokemon-list-item--active' : ''}`}>
      <NavLink className="pokemon-list-item__link" to={detailPath}>
        <div className="pokemon-list-item__visual">
          <img
            className="pokemon-list-item__image"
            src={pokemon.imageUrl}
            alt={pokemon.name}
            loading="lazy"
          />
        </div>
        <div className="pokemon-list-item__content">
          <p className="pokemon-list-item__number">
            #{String(pokemon.id).padStart(3, '0')}
          </p>
          <h2 className="pokemon-list-item__name">{pokemon.name}</h2>
        </div>
      </NavLink>
      <button
        aria-label={favorite ? `Remove ${pokemon.name} from favorites` : `Add ${pokemon.name} to favorites`}
        aria-pressed={favorite}
        className={`favorite-button${favorite ? ' favorite-button--active' : ''}`}
        onClick={() => toggleFavorite(pokemon.id)}
        type="button"
      >
        <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>
      </button>
    </article>
  )
}
