import type { Stat } from '../data/types'

const SIZE = 280
const CENTER = SIZE / 2
const RADIUS = 80
const LABEL_RADIUS = 110

const ANGLES = [0, 60, 120, 180, 240, 300].map((deg) => ((deg - 90) * Math.PI) / 180)

function point(angle: number, r: number): [number, number] {
  return [CENTER + Math.cos(angle) * r, CENTER + Math.sin(angle) * r]
}

function clamp(v: number) {
  return Math.max(0, Math.min(100, v))
}

export function StatHex({ stats }: { stats: Stat[] }) {
  const six: Stat[] = stats.slice(0, 6)
  while (six.length < 6) six.push({ label: '—', value: 0 })

  const rings = [0.34, 0.67, 1].map((scale) =>
    ANGLES.map((a) => point(a, RADIUS * scale).join(',')).join(' '),
  )

  const dataPoints = ANGLES.map((a, i) =>
    point(a, RADIUS * (clamp(six[i].value) / 100)).join(','),
  ).join(' ')

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width="280"
      height="280"
      role="img"
      aria-label="Skill stats radar"
      className="drop-shadow-[0_0_18px_rgba(159,208,255,0.55)]"
    >
      {ANGLES.map((a, i) => {
        const [x, y] = point(a, RADIUS)
        return (
          <line
            key={`axis-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="rgba(159,208,255,0.45)"
            strokeWidth={1}
          />
        )
      })}
      {rings.map((pts, i) => (
        <polygon
          key={`ring-${i}`}
          points={pts}
          fill="none"
          stroke="rgba(159,208,255,0.35)"
          strokeWidth={1}
        />
      ))}
      <polygon
        points={dataPoints}
        fill="rgba(242,193,78,0.32)"
        stroke="#f2c14e"
        strokeWidth={2}
        style={{ filter: 'drop-shadow(0 0 8px rgba(242,193,78,0.7))' }}
      />
      {ANGLES.map((a, i) => {
        const [x, y] = point(a, RADIUS * (clamp(six[i].value) / 100))
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r={3.5}
            fill="#f2c14e"
            stroke="#fff"
            strokeWidth={1}
          />
        )
      })}
      {ANGLES.map((a, i) => {
        const [x, y] = point(a, LABEL_RADIUS)
        return (
          <text
            key={`label-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="bold"
            fill="#fff"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.9))' }}
          >
            {six[i].label}
          </text>
        )
      })}
    </svg>
  )
}
