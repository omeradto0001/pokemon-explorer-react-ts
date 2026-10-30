import type { PokemonSummary } from '../types/pokemon'

export function filterPokemonByName(
  pokemon: PokemonSummary[],
  query: string,
): PokemonSummary[] {
  const normalizedQuery = query.trim().toLowerCase()

  return pokemon.filter((item) =>
    item.name.toLowerCase().includes(normalizedQuery),
  )
}
