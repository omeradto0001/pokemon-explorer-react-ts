import { useState } from 'react'
import type { PokemonDetails } from '../types/pokemon'

type PokemonArtworkProps = {
  pokemon: PokemonDetails
}

export default function PokemonArtwork({ pokemon }: PokemonArtworkProps) {
  const [imageFailed, setImageFailed] = useState(false)

  if (!pokemon.imageUrl || imageFailed) {
    return (
      <div className="pokemon-detail__image-fallback" role="img" aria-label={`No image available for ${pokemon.name}`}>
        No image available
      </div>
    )
  }

  return (
    <img
      src={pokemon.imageUrl}
      alt={pokemon.name}
      onError={() => setImageFailed(true)}
    />
  )
}
