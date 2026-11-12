import type { PokemonSummary } from '../types/pokemon'

type PokemonSelectProps = {
  id: string
  label: string
  pokemonList: PokemonSummary[]
  value: number | null
  disabledId: number | null
  onChange: (pokemonId: number | null) => void
}

export default function PokemonSelect({ id, label, pokemonList, value, disabledId, onChange }: PokemonSelectProps) {
  return (
    <div className="catalog-search">
      <label className="catalog-search__label" htmlFor={id}>{label}</label>
      <select
        className="catalog-search__input"
        id={id}
        onChange={(event) => onChange(event.target.value ? Number(event.target.value) : null)}
        value={value ?? ''}
      >
        <option value="">Choose a Pokemon</option>
        {pokemonList.map((item) => (
          <option disabled={item.id === disabledId} key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}
