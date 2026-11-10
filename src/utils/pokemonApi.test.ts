import { afterEach, describe, expect, test, vi } from 'vitest'
import type { PokemonDetailApiResponse } from '../types/pokeapi'
import { fetchPokemonDetails, getPokemonDetailsUrl } from './pokemonApi'
import { toPokemonDetails } from './pokemonMappers'

const pikachuResponse: PokemonDetailApiResponse = {
  id: 25,
  name: 'pikachu',
  sprites: {
    front_default: 'https://example.com/pikachu-sprite.png',
    other: {
      'official-artwork': {
        front_default: 'https://example.com/pikachu-artwork.png',
      },
    },
  },
  types: [
    { slot: 1, type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' } },
  ],
  abilities: [
    { ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' } },
  ],
  stats: [
    { base_stat: 35, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
  ],
  height: 4,
  weight: 60,
}

function mockFetch(implementation: () => Promise<Response>) {
  const fetchMock = vi.fn(implementation)
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchPokemonDetails', () => {
  test('requests the detail URL for the given id', async () => {
    const fetchMock = mockFetch(async () => Response.json(pikachuResponse))

    await fetchPokemonDetails(25)

    expect(fetchMock).toHaveBeenCalledWith(getPokemonDetailsUrl(25), { signal: undefined })
    expect(getPokemonDetailsUrl(25)).toBe('https://pokeapi.co/api/v2/pokemon/25/')
  })

  test('returns success with the API response mapped to the app model', async () => {
    mockFetch(async () => Response.json(pikachuResponse))

    expect(await fetchPokemonDetails(25)).toEqual({
      status: 'success',
      pokemon: toPokemonDetails(pikachuResponse),
    })
  })

  test('returns not-found when the API responds with 404', async () => {
    mockFetch(async () => new Response(null, { status: 404 }))

    expect(await fetchPokemonDetails(99999)).toEqual({ status: 'not-found' })
  })

  test('returns error when the API responds with a server error', async () => {
    mockFetch(async () => new Response(null, { status: 500 }))

    expect(await fetchPokemonDetails(25)).toEqual({ status: 'error' })
  })

  test('returns error when the network request fails', async () => {
    mockFetch(async () => {
      throw new TypeError('Failed to fetch')
    })

    expect(await fetchPokemonDetails(25)).toEqual({ status: 'error' })
  })
})
