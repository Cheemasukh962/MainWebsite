import { useState } from 'react'

export function Avatar({ src, alt }: { src: string; alt: string }) {
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
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-80 animate-[float_3s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(55,160,255,0.6)]"
    />
  )
}
