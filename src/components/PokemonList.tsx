import type { PokemonSummary } from '../types/pokemon'
import PokemonListItem from './PokemonListItem'

type PokemonListProps = {
  pokemon: PokemonSummary[]
}

export default function PokemonList({ pokemon }: PokemonListProps) {
  return (
    <div className="pokemon-list">
      {pokemon.map((item) => (
        <PokemonListItem key={item.id} pokemon={item} />
      ))}
    </div>
  )
}
