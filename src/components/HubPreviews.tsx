import { Avatar } from './Avatar'
import { StatHex } from './StatHex'
import { content } from '../data/content'
import { LinkedInIcon, GitHubIcon, MailIcon } from './icons'

export function AboutPreview() {
  return (
    <div className="relative flex h-[420px] w-[360px] items-center justify-center">
      <svg
        viewBox="0 0 240 240"
        className="xeno-anim absolute h-[340px] w-[340px]"
        style={{ animation: 'ray-spin 14s linear infinite' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ki-ring-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f2c14e" />
            <stop offset="0.5" stopColor="#37a0ff" />
            <stop offset="1" stopColor="#f2c14e" />
          </linearGradient>
        </defs>
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          stroke="url(#ki-ring-a)"
          strokeWidth="3"
          strokeDasharray="22 6 5 4 22 8"
          style={{ filter: 'drop-shadow(0 0 6px rgba(242,193,78,0.6))' }}
        />
      </svg>
      {/* Hub About preview avatar size — change `sizeClass` below to resize the photo.
          Tailwind sizes: h-48 w-48 (192px), h-56 w-56 (224px), h-64 w-64 (256px),
          h-72 w-72 (288px, default), h-80 w-80 (320px). */}
      <Avatar
        src={content.about.avatar}
        alt={content.about.name}
        sizeClass="h-66 w-66"
      />
    </div>
  )
}

export function SkillsPreview() {
  return (
    <div className="flex h-[420px] w-[360px] items-center justify-center">
      <StatHex stats={content.stats} />
    </div>
  )
}

export function ProjectsPreview() {
  const top = content.projects.slice(0, 4)
  return (
    <div className="flex h-[420px] w-[360px] flex-col items-center justify-center gap-4">
      {top.map((p, i) => (
        <div
          key={p.id}
          className="xeno-anim w-72 rounded-full border-2 border-ki-200/60 bg-ki-900/75 px-5 py-3 text-white backdrop-blur"
          style={{
            animation: 'float 3.6s ease-in-out infinite',
            animationDelay: `${i * 0.45}s`,
            boxShadow: '0 0 22px rgba(55,160,255,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-gold shadow-[0_0_10px_#f2c14e]" />
            <span className="flex-1 truncate font-semibold tracking-wide">
              {p.title}
            </span>
            <span className="text-[10px] font-bold text-ki-200">
              {p.tags[0]}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ContactPreview() {
  return (
    <div className="relative flex h-[420px] w-[360px] items-center justify-center">
      <div
        className="xeno-anim absolute h-[280px] w-[280px] rounded-full border border-ki-200/30"
        style={{ animation: 'bg-pulse 4s ease-in-out infinite' }}
      />
      <div
        className="xeno-anim absolute h-[280px] w-[280px]"
        style={{ animation: 'ray-spin 16s linear infinite' }}
      >
        <div className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2">
          <GitHubIcon className="h-full w-full drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]" />
        </div>
      </div>
      <div
        className="xeno-anim absolute h-[280px] w-[280px]"
        style={{ animation: 'ray-spin 22s linear infinite reverse' }}
      >
        <div className="absolute bottom-0 left-1/2 h-14 w-14 -translate-x-1/2 translate-y-1/2">
          <MailIcon className="h-full w-full drop-shadow-[0_0_12px_rgba(242,193,78,0.6)]" />
        </div>
      </div>
      <div
        className="xeno-anim relative h-32 w-32"
        style={{ animation: 'ray-spin 8s linear infinite' }}
      >
        <LinkedInIcon className="h-full w-full drop-shadow-[0_0_26px_rgba(10,102,194,0.8)]" />
      </div>
    </div>
  )
}
