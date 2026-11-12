import type { PokemonSummary } from '../types/pokemon'
import PokemonListItem from './PokemonListItem'

type PokemonListProps = {
  pokemonList: PokemonSummary[]
}

export default function PokemonList({ pokemonList }: PokemonListProps) {
  return (
    <section className="catalog" aria-label="Pokemon catalog">
      <div className="pokemon-list">
        {pokemonList.map((item) => (
          <PokemonListItem key={item.id} pokemon={item} />
        ))}
      </div>
    </section>
  )
}
