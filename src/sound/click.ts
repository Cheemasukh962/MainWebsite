// Module-level singleton for the site's click SFX.
// - Respects a synced `enabled` flag (mirrored from useGameState.soundEnabled).
// - Resets currentTime so rapid clicks re-trigger cleanly.
// - Ignores autoplay-blocked errors (first click before gesture, mobile Safari).
// - Safe on server (no-op if window is undefined).

let enabled = false
let audio: HTMLAudioElement | null = null

if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
  audio = new Audio('/sounds/click.wav')
  audio.preload = 'auto'
  audio.volume = 0.4
}

export function setSoundEnabled(next: boolean) {
  enabled = next
}

export function playClick() {
  if (!enabled || !audio) return
  audio.currentTime = 0
  void audio.play().catch(() => {
    // Autoplay policy / user hasn't interacted yet — silent no-op.
  })
}
