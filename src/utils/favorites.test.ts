import { describe, expect, test } from 'vitest'
import {
  isFavorite,
  parseFavoriteIds,
  readFavoriteIds,
  toggleFavorite,
  writeFavoriteIds,
} from './favorites'

describe('favorite logic', () => {
  test('checks whether an id is saved', () => {
    expect(isFavorite([4, 25], 25)).toBe(true)
    expect(isFavorite([4, 25], 1)).toBe(false)
  })

  test('adds and removes ids without changing the original list', () => {
    const favoriteIds = [4]

    expect(toggleFavorite(favoriteIds, 25)).toEqual([4, 25])
    expect(toggleFavorite(favoriteIds, 4)).toEqual([])
    expect(favoriteIds).toEqual([4])
  })

  test('parses valid ids and removes duplicates or invalid values', () => {
    expect(parseFavoriteIds('[4, 25, 25, "1", 0, -2, null]')).toEqual([4, 25])
  })

  test('falls back to an empty list for invalid stored data', () => {
    expect(parseFavoriteIds('not-json')).toEqual([])
    expect(parseFavoriteIds('{"id": 25}')).toEqual([])
  })

  test('reads and writes favorite ids through storage', () => {
    const values = new Map<string, string>()
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    }

    writeFavoriteIds([25, 4], storage)

    expect(readFavoriteIds(storage)).toEqual([25, 4])
  })
})
