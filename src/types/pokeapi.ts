export type NamedApiResource = {
  name: string
  url: string
}

export type PokemonListApiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: NamedApiResource[]
}

export type PokemonDetailApiResponse = {
  id: number
  name: string
  sprites: {
    front_default: string | null
    other: {
      'official-artwork': {
        front_default: string | null
      }
    }
  }
  types: {
    slot: number
    type: NamedApiResource
  }[]
  abilities: {
    ability: NamedApiResource
  }[]
  stats: {
    base_stat: number
    stat: NamedApiResource
  }[]
  height: number
  weight: number
}
