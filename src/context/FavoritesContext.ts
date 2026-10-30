import { createContext, useContext } from 'react'

export type FavoritesContextValue = {
  favoriteIds: number[]
  isFavorite: (pokemonId: number) => boolean
  toggleFavorite: (pokemonId: number) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }

  return context
}
