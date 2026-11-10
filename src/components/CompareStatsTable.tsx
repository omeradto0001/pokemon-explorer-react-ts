import type { PokemonDetails } from '../types/pokemon'
import { combineStats, getStatLeader, getStatPercent, type CompareSide } from '../utils/compare'

type StatValueProps = {
  side: CompareSide
  value: number | null
  isLeader: boolean
}

function StatValue({ side, value, isLeader }: StatValueProps) {
  const bar = (
    <span className="comparison__bar" aria-hidden="true">
      <span style={{ width: `${getStatPercent(value)}%` }} />
    </span>
  )
  const number = <span className="comparison__number">{value ?? '—'}</span>

  // The number sits next to the stat name, so the bars grow outward from the center.
  return (
    <td className={`comparison__value comparison__value--${side}${isLeader ? ' comparison__value--leader' : ''}`}>
      {side === 'first' ? <>{bar}{number}</> : <>{number}{bar}</>}
    </td>
  )
}

type CompareStatsTableProps = {
  first: PokemonDetails
  second: PokemonDetails
}

export default function CompareStatsTable({ first, second }: CompareStatsTableProps) {
  return (
    <table className="comparison__stats">
      <caption>Base stats</caption>
      <thead>
        <tr>
          <th className="comparison__name comparison__name--first" scope="col">{first.name}</th>
          <th scope="col">Stat</th>
          <th className="comparison__name comparison__name--second" scope="col">{second.name}</th>
        </tr>
      </thead>
      <tbody>
        {combineStats(first.stats, second.stats).map((row) => {
          const leader = getStatLeader(row)

          return (
            <tr key={row.name}>
              <StatValue side="first" value={row.first} isLeader={leader === 'first'} />
              <th scope="row">{row.name}</th>
              <StatValue side="second" value={row.second} isLeader={leader === 'second'} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
