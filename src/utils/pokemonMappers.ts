import type { NamedApiResource, PokemonDetailApiResponse } from '../types/pokeapi'
import type { PokemonDetails, PokemonSummary } from '../types/pokemon'

const POKEMON_URL_PATTERN = /^\/api\/v2\/pokemon\/([1-9]\d*)\/?$/
const ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function getPokemonIdFromUrl(resourceUrl: string): number {
  let url: URL

  try {
    url = new URL(resourceUrl)
  } catch {
    throw new Error(`Invalid Pokemon resource URL: ${resourceUrl}`)
  }

  const match = url.pathname.match(POKEMON_URL_PATTERN)
  const id = match ? Number(match[1]) : NaN

  if (url.origin !== 'https://pokeapi.co' || !Number.isSafeInteger(id)) {
    throw new Error(`Invalid Pokemon resource URL: ${resourceUrl}`)
  }

  return id
}

export function toPokemonSummary(resource: NamedApiResource): PokemonSummary {
  const id = getPokemonIdFromUrl(resource.url)

  return {
    id,
    name: formatPokemonName(resource.name),
    imageUrl: `${ARTWORK_BASE_URL}/${id}.png`,
  }
}

export function toPokemonDetails(response: PokemonDetailApiResponse): PokemonDetails {
  return {
    id: response.id,
    name: formatPokemonName(response.name),
    imageUrl:
      response.sprites.other['official-artwork'].front_default ??
      response.sprites.front_default,
    types: [...response.types]
      .sort((first, second) => first.slot - second.slot)
      .map(({ type }) => formatPokemonName(type.name)),
    abilities: response.abilities.map(({ ability }) =>
      formatPokemonName(ability.name),
    ),
    stats: response.stats.map(({ base_stat, stat }) => ({
      name: formatPokemonName(stat.name),
      baseValue: base_stat,
    })),
    height: response.height,
    weight: response.weight,
  }
}
