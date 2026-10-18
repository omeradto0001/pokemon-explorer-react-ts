import type { PokemonSummary } from '../types/pokemon'

type PokemonListItemProps = {
  pokemon: PokemonSummary
}

export default function PokemonListItem({ pokemon }: PokemonListItemProps) {
  return (
    <article className="pokemon-list-item">
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <p>#{pokemon.id}</p>
      <h2>{pokemon.name}</h2>
    </article>
  )
}
