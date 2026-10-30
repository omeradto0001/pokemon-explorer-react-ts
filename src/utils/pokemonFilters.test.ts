import { describe, expect, test } from 'vitest'
import type { PokemonSummary } from '../types/pokemon'
import { filterPokemonByName } from './pokemonFilters'

const samplePokemon: PokemonSummary[] = [
  { id: 1, name: 'Bulbasaur', imageUrl: 'bulbasaur.png' },
  { id: 4, name: 'Charmander', imageUrl: 'charmander.png' },
  { id: 25, name: 'Pikachu', imageUrl: 'pikachu.png' },
]

describe('filterPokemonByName', () => {
  test('returns Pokemon whose names contain the query', () => {
    expect(filterPokemonByName(samplePokemon, 'char')).toEqual([samplePokemon[1]])
  })

  test('ignores letter casing and surrounding whitespace', () => {
    expect(filterPokemonByName(samplePokemon, '  PIKA  ')).toEqual([samplePokemon[2]])
  })

  test('returns an empty list when there are no matches', () => {
    expect(filterPokemonByName(samplePokemon, 'mewtwo')).toEqual([])
  })

  test('returns every Pokemon for an empty query', () => {
    expect(filterPokemonByName(samplePokemon, '')).toEqual(samplePokemon)
  })

  test('does not change the original list', () => {
    filterPokemonByName(samplePokemon, 'pika')
    expect(samplePokemon).toHaveLength(3)
  })
})
