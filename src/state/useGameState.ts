import { useCallback, useState } from 'react'

export type ScreenId = 'boot' | 'hub' | 'about' | 'skills' | 'projects' | 'contact'
export type SectionId = 'about' | 'skills' | 'projects' | 'contact'

export function useGameState() {
  const [screen, setScreen] = useState<ScreenId>('boot')
  const [soundEnabled, setSoundEnabled] = useState(false)

  const goTo = useCallback((s: ScreenId) => setScreen(s), [])
  const startGame = useCallback(() => setScreen('hub'), [])
  const toggleSound = useCallback(() => setSoundEnabled((v) => !v), [])

  return { screen, soundEnabled, goTo, startGame, toggleSound }
}
