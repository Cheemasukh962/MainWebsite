import { useState } from 'react'

interface AvatarProps {
  src: string
  alt: string
  // Tailwind size classes for the circle. Default fills 288px (h-72 w-72).
  // Use h-56 w-56 (224px) for a tighter fit, h-80 w-80 (320px) for bigger, etc.
  sizeClass?: string
}

export function Avatar({ src, alt, sizeClass = 'h-72 w-72' }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        data-testid="avatar-fallback"
        aria-label={alt}
        className="h-64 w-40 rounded-full bg-ki-600/50 shadow-[0_0_40px] shadow-ki-400"
      />
    )
  }
  return (
    <div
      className={`relative ${sizeClass} animate-[float_3s_ease-in-out_infinite] rounded-full bg-ki-900/30 shadow-[0_0_30px_rgba(55,160,255,0.6)] ring-2 ring-ki-200/40 overflow-hidden`}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
