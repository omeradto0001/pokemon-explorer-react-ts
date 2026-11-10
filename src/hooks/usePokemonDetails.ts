import { useEffect, useState } from 'react'
import { fetchPokemonDetails, type PokemonDetailsResult } from '../utils/pokemonApi'

export type PokemonDetailsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | PokemonDetailsResult

type RequestState = { requestedId: number; state: PokemonDetailsState }

export function usePokemonDetails(pokemonId: number | null) {
  const [request, setRequest] = useState<RequestState | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (pokemonId === null) {
      return
    }

    const controller = new AbortController()

    async function loadPokemonDetails(requestedId: number) {
      setRequest({ requestedId, state: { status: 'loading' } })

      const result = await fetchPokemonDetails(requestedId, controller.signal)

      if (!controller.signal.aborted) {
        setRequest({ requestedId, state: result })
      }
    }

    void loadPokemonDetails(pokemonId)

    return () => controller.abort()
  }, [pokemonId, attempt])

  const state: PokemonDetailsState = pokemonId === null
    ? { status: 'idle' }
    : request?.requestedId === pokemonId
      ? request.state
      : { status: 'loading' }

  return {
    state,
    retry: () => setAttempt((current) => current + 1),
  }
}
