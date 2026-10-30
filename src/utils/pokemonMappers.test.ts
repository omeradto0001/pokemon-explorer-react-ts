import { describe, expect, test } from 'vitest'
import type { PokemonDetailApiResponse } from '../types/pokeapi'
import { getPokemonIdFromUrl, toPokemonDetails, toPokemonSummary } from './pokemonMappers'

describe('getPokemonIdFromUrl', () => {
  test('extracts the numeric id from a Pokemon API URL', () => {
    expect(getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
  })

  test('accepts a Pokemon API URL without a trailing slash', () => {
    expect(getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/6')).toBe(6)
  })

  test('rejects a URL from a different origin', () => {
    expect(() =>
      getPokemonIdFromUrl('https://example.com/api/v2/pokemon/25/'),
    ).toThrow('Invalid Pokemon resource URL')
  })

  test('rejects a resource URL without a positive numeric id', () => {
    expect(() =>
      getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/charizard/'),
    ).toThrow('Invalid Pokemon resource URL')
  })
})

describe('toPokemonSummary', () => {
  test('maps a named API resource to the app summary model', () => {
    expect(
      toPokemonSummary({
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      }),
    ).toEqual({
      id: 25,
      name: 'Pikachu',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    })
  })

  test('rejects a summary resource with an invalid URL', () => {
    expect(() =>
      toPokemonSummary({
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/pikachu/',
      }),
    ).toThrow('Invalid Pokemon resource URL')
  })
})

describe('toPokemonDetails', () => {
  const detailResponse: PokemonDetailApiResponse = {
    id: 25,
    name: 'pikachu',
    sprites: {
      front_default: 'https://example.com/front.png',
      other: {
        'official-artwork': {
          front_default: 'https://example.com/official.png',
        },
      },
    },
    types: [
      {
        slot: 2,
        type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
      },
      {
        slot: 1,
        type: { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
      },
    ],
    abilities: [
      {
        ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' },
      },
    ],
    stats: [
      {
        base_stat: 35,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
      },
      {
        base_stat: 90,
        stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
      },
    ],
    height: 4,
    weight: 60,
  }

  test('maps detail fields into the app detail model', () => {
    expect(toPokemonDetails(detailResponse)).toEqual({
      id: 25,
      name: 'Pikachu',
      imageUrl: 'https://example.com/official.png',
      types: ['Normal', 'Electric'],
      abilities: ['Static'],
      stats: [
        { name: 'Hp', baseValue: 35 },
        { name: 'Speed', baseValue: 90 },
      ],
      height: 4,
      weight: 60,
    })
  })

  test('uses the front sprite when official artwork is missing', () => {
    const responseWithoutArtwork: PokemonDetailApiResponse = {
      ...detailResponse,
      sprites: {
        ...detailResponse.sprites,
        other: { 'official-artwork': { front_default: null } },
      },
    }

    expect(toPokemonDetails(responseWithoutArtwork).imageUrl).toBe(
      'https://example.com/front.png',
    )
  })
})
