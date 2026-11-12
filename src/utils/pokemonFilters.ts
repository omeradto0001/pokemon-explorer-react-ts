import type { PokemonSummary } from '../types/pokemon'

export function filterPokemonByName(
  pokemonList: PokemonSummary[],
  query: string,
): PokemonSummary[] {
  const normalizedQuery = query.trim().toLowerCase()

  return pokemonList.filter((item) =>
    item.name.toLowerCase().includes(normalizedQuery),
  )
}
