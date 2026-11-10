import type { PokemonStat } from '../types/pokemon'

export type CompareStatRow = {
  name: string
  first: number | null
  second: number | null
}

export type StatLeader = 'first' | 'second' | 'tie' | null

export const MAX_BASE_STAT = 255

export function getStatLeader(row: CompareStatRow): StatLeader {
  if (row.first === null || row.second === null) {
    return null
  }

  if (row.first === row.second) {
    return 'tie'
  }

  return row.first > row.second ? 'first' : 'second'
}

export function getStatPercent(value: number | null): number {
  if (value === null) {
    return 0
  }

  return Math.min(100, Math.max(0, (value / MAX_BASE_STAT) * 100))
}

export function canCompare(firstId: number | null, secondId: number | null): boolean {
  return firstId !== null && secondId !== null && firstId !== secondId
}

export function combineStats(firstStats: PokemonStat[], secondStats: PokemonStat[]): CompareStatRow[] {
  const names = [...new Set([...firstStats, ...secondStats].map((stat) => stat.name))]

  return names.map((name) => ({
    name,
    first: firstStats.find((stat) => stat.name === name)?.baseValue ?? null,
    second: secondStats.find((stat) => stat.name === name)?.baseValue ?? null,
  }))
}
