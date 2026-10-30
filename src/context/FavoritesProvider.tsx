import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  isFavorite as checkIsFavorite,
  readFavoriteIds,
  toggleFavorite as toggleFavoriteId,
  writeFavoriteIds,
} from '../utils/favorites'
import {
  FavoritesContext,
  type FavoritesContextValue,
} from './FavoritesContext'

type FavoritesProviderProps = {
  children: ReactNode
}

export default function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState(readFavoriteIds)

  useEffect(() => {
    writeFavoriteIds(favoriteIds)
  }, [favoriteIds])

  const isFavorite = useCallback(
    (pokemonId: number) => checkIsFavorite(favoriteIds, pokemonId),
    [favoriteIds],
  )
  const toggleFavorite = useCallback((pokemonId: number) => {
    setFavoriteIds((currentIds) => toggleFavoriteId(currentIds, pokemonId))
  }, [])
  const value: FavoritesContextValue = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
