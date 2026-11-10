import type { PokemonDetailApiResponse } from '../types/pokeapi'
import type { PokemonDetails } from '../types/pokemon'
import { toPokemonDetails } from './pokemonMappers'

export type PokemonDetailsResult =
  | { status: 'success'; pokemon: PokemonDetails }
  | { status: 'not-found' }
  | { status: 'error' }

export function getPokemonDetailsUrl(pokemonId: number): string {
  return `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
}

export async function fetchPokemonDetails(
  pokemonId: number,
  signal?: AbortSignal,
): Promise<PokemonDetailsResult> {
  try {
    const response = await fetch(getPokemonDetailsUrl(pokemonId), { signal })

    if (response.status === 404) {
      return { status: 'not-found' }
    }

    if (!response.ok) {
      return { status: 'error' }
    }

    const data: PokemonDetailApiResponse = await response.json()

    return { status: 'success', pokemon: toPokemonDetails(data) }
  } catch {
    return { status: 'error' }
  }
}
