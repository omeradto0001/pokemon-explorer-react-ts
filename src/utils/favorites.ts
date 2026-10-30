export const FAVORITES_STORAGE_KEY = 'pokemon-explorer:favorites'

type FavoriteStorage = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

export function isFavorite(favoriteIds: number[], pokemonId: number) {
  return favoriteIds.includes(pokemonId)
}

export function toggleFavorite(favoriteIds: number[], pokemonId: number) {
  return isFavorite(favoriteIds, pokemonId)
    ? favoriteIds.filter((id) => id !== pokemonId)
    : [...favoriteIds, pokemonId]
}

export function parseFavoriteIds(rawValue: string | null) {
  if (!rawValue) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(rawValue)

    if (!Array.isArray(parsed)) {
      return []
    }

    return [...new Set(
      parsed.filter(
        (value): value is number =>
          typeof value === 'number' && Number.isInteger(value) && value > 0,
      ),
    )]
  } catch {
    return []
  }
}

export function readFavoriteIds(storage?: FavoriteStorage) {
  if (!storage && typeof window === 'undefined') {
    return []
  }

  try {
    const targetStorage = storage ?? window.localStorage
    return parseFavoriteIds(targetStorage.getItem(FAVORITES_STORAGE_KEY))
  } catch {
    return []
  }
}

export function writeFavoriteIds(favoriteIds: number[], storage?: FavoriteStorage) {
  if (!storage && typeof window === 'undefined') {
    return
  }

  try {
    const targetStorage = storage ?? window.localStorage
    targetStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  } catch {
    // Storage can be unavailable in private browsing or restricted environments.
  }
}
