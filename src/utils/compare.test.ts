import { describe, expect, test } from 'vitest'
import type { PokemonStat } from '../types/pokemon'
import { canCompare, combineStats, getStatLeader, getStatPercent } from './compare'

describe('getStatLeader', () => {
  test('returns the side with the higher value', () => {
    expect(getStatLeader({ name: 'hp', first: 60, second: 45 })).toBe('first')
    expect(getStatLeader({ name: 'hp', first: 30, second: 45 })).toBe('second')
  })

  test('returns tie for equal values', () => {
    expect(getStatLeader({ name: 'hp', first: 45, second: 45 })).toBe('tie')
  })

  test('returns null when a value is missing', () => {
    expect(getStatLeader({ name: 'hp', first: 45, second: null })).toBeNull()
  })
})

describe('getStatPercent', () => {
  test('scales a base stat against the maximum of 255', () => {
    expect(getStatPercent(51)).toBe(20)
    expect(getStatPercent(255)).toBe(100)
  })

  test('returns 0 for a missing value and caps values above the maximum', () => {
    expect(getStatPercent(null)).toBe(0)
    expect(getStatPercent(300)).toBe(100)
  })
})

describe('canCompare', () => {
  test('allows two different Pokemon', () => {
    expect(canCompare(1, 4)).toBe(true)
  })

  test('rejects the same Pokemon twice', () => {
    expect(canCompare(25, 25)).toBe(false)
  })

  test('rejects an incomplete selection', () => {
    expect(canCompare(null, 4)).toBe(false)
    expect(canCompare(1, null)).toBe(false)
    expect(canCompare(null, null)).toBe(false)
  })
})

describe('combineStats', () => {
  test('pairs matching stats by name in the first Pokemon order', () => {
    const first: PokemonStat[] = [
      { name: 'hp', baseValue: 45 },
      { name: 'attack', baseValue: 49 },
    ]
    const second: PokemonStat[] = [
      { name: 'attack', baseValue: 52 },
      { name: 'hp', baseValue: 39 },
    ]

    expect(combineStats(first, second)).toEqual([
      { name: 'hp', first: 45, second: 39 },
      { name: 'attack', first: 49, second: 52 },
    ])
  })

  test('uses null when one Pokemon is missing a stat', () => {
    const first: PokemonStat[] = [{ name: 'hp', baseValue: 45 }]
    const second: PokemonStat[] = [{ name: 'speed', baseValue: 65 }]

    expect(combineStats(first, second)).toEqual([
      { name: 'hp', first: 45, second: null },
      { name: 'speed', first: null, second: 65 },
    ])
  })

  test('returns an empty list when neither Pokemon has stats', () => {
    expect(combineStats([], [])).toEqual([])
  })
})
