export type PokemonSummary = {
  id: number
  name: string
  imageUrl: string
}

export type PokemonStat = {
  name: string
  baseValue: number
}

export type PokemonDetails = {
  id: number
  name: string
  imageUrl: string | null
  types: string[]
  abilities: string[]
  stats: PokemonStat[]
  height: number
  weight: number
}
