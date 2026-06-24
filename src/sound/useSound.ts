export interface SoundOptions {
  enabled: () => boolean
  play: (name: string) => void
}

export function createSoundPlayer(opts: SoundOptions) {
  return {
    trigger(name: string) {
      if (opts.enabled()) opts.play(name)
    },
  }
}
