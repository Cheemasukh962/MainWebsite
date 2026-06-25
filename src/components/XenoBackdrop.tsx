import type { ReactNode } from 'react'

const PARTICLES: { left: number; size: number; duration: number; delay: number }[] = [
  { left: 6,  size: 3, duration: 18, delay: 0 },
  { left: 14, size: 2, duration: 24, delay: 6 },
  { left: 22, size: 4, duration: 20, delay: 2 },
  { left: 33, size: 2, duration: 26, delay: 10 },
  { left: 41, size: 3, duration: 22, delay: 4 },
  { left: 52, size: 2, duration: 28, delay: 14 },
  { left: 63, size: 4, duration: 19, delay: 1 },
  { left: 72, size: 3, duration: 23, delay: 8 },
  { left: 81, size: 2, duration: 26, delay: 12 },
  { left: 91, size: 3, duration: 21, delay: 5 },
]

interface XenoBackdropProps {
  children: ReactNode
  // Height behavior. Use `min-h-screen` for top-level screens, `h-full` when nested inside a flex-1 container.
  heightClass?: string
}

export function XenoBackdrop({ children, heightClass = 'min-h-screen' }: XenoBackdropProps) {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden text-white ${heightClass}`}
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center, #b8e0ff 0%, #6fb5e8 35%, #2d7cba 72%, #0f3a6b 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="xeno-anim pointer-events-none absolute -inset-1/2 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 10deg, rgba(255,255,255,0.18) 10deg 11deg)',
          animation: 'ray-spin 80s linear infinite, bg-pulse 9s ease-in-out infinite',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="xeno-anim absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-white/25 blur-3xl"
          style={{ animation: 'drift-a 32s ease-in-out infinite' }}
        />
        <div
          className="xeno-anim absolute right-[12%] top-[28%] h-80 w-80 rounded-full bg-white/20 blur-3xl"
          style={{ animation: 'drift-b 46s ease-in-out infinite' }}
        />
        <div
          className="xeno-anim absolute bottom-[15%] left-[32%] h-56 w-56 rounded-full bg-white/15 blur-3xl"
          style={{ animation: 'drift-c 38s ease-in-out infinite' }}
        />
        <div
          className="xeno-anim absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-ki-50/30 blur-3xl"
          style={{ animation: 'drift-a 52s ease-in-out infinite reverse' }}
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="xeno-anim absolute block rounded-full bg-white/70"
            style={{
              left: `${p.left}%`,
              bottom: `-${p.size}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 8px rgba(255,255,255,0.8)',
              animation: `ki-rise ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  )
}
