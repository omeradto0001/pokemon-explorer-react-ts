import { NavLink } from 'react-router-dom'
import type { PokemonSummary } from '../types/pokemon'

type PokemonListItemProps = {
  pokemon: PokemonSummary
}

export default function PokemonListItem({ pokemon }: PokemonListItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `pokemon-list-item${isActive ? ' pokemon-list-item--active' : ''}`
      }
      to={`/pokemon/${pokemon.id}`}
    >
      <article className="pokemon-list-item__body">
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
      </article>
    </NavLink>
  )
}
