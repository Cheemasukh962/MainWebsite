import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useGameState, type SectionId } from '../state/useGameState'
import { BootScreen } from './BootScreen'
import { MainHub } from './MainHub'
import { JumpNav } from './JumpNav'
import { ButtonPromptBar } from './ButtonPromptBar'
import { AboutScreen } from '../screens/AboutScreen'
import { SkillsScreen } from '../screens/SkillsScreen'
import { ProjectsScreen } from '../screens/ProjectsScreen'
import { ContactScreen } from '../screens/ContactScreen'
import { getTransitionVariants } from './transitionVariants'
import { playClick, setSoundEnabled } from '../sound/click'

const SECTION_COMPONENTS: Record<SectionId, () => React.JSX.Element> = {
  about: AboutScreen,
  skills: SkillsScreen,
  projects: ProjectsScreen,
  contact: ContactScreen,
}

export function GameShell() {
  const { screen, soundEnabled, goTo, startGame, toggleSound } = useGameState()
  const reduce = useReducedMotion()
  const anim = getTransitionVariants(reduce ?? false)

  // Keep the audio player's enabled flag in sync with UI state.
  useEffect(() => {
    setSoundEnabled(soundEnabled)
  }, [soundEnabled])

  const withClick = <T,>(fn: (arg: T) => void) => (arg: T) => {
    playClick()
    fn(arg)
  }
  const handleToggleSound = () => {
    // When turning ON, update the audio-module flag first so the confirmation
    // click actually plays (the useEffect below runs on next render, too late).
    const willBeEnabled = !soundEnabled
    setSoundEnabled(willBeEnabled)
    if (willBeEnabled) playClick()
    toggleSound()
  }

  const isSection = screen !== 'boot' && screen !== 'hub'
  const Section = isSection ? (SECTION_COMPONENTS[screen as SectionId] ?? null) : null

  return (
    <div data-testid="app-root" className="min-h-screen bg-ki-900 text-white">
      <AnimatePresence mode="wait">
        {screen === 'boot' && (
          <motion.div key="boot" {...anim}>
            <BootScreen onStart={startGame} />
          </motion.div>
        )}
        {screen === 'hub' && (
          <motion.div key="hub" {...anim}>
            <MainHub onSelect={withClick(goTo)} />
          </motion.div>
        )}
        {isSection && Section && (
          <motion.div key={screen} {...anim} className="flex min-h-screen flex-col">
            <div className="flex items-center justify-between border-b-2 border-gold/70 bg-ki-900/85 backdrop-blur-sm">
              <JumpNav
                active={screen as SectionId}
                onJump={withClick(goTo)}
                onReturn={withClick(() => goTo('hub'))}
              />
              <button
                type="button"
                onClick={handleToggleSound}
                aria-label={soundEnabled ? 'Sound on' : 'Sound off'}
                className="mr-4 flex items-center gap-2 rounded-md border border-gold/80 bg-black/40 px-3 py-1.5 text-[10px] font-black italic tracking-[0.25em] text-gold transition hover:bg-gold hover:text-ki-900"
                style={{ textShadow: '0 0 8px rgba(242,193,78,0.5)' }}
              >
                <span aria-hidden="true" className="text-sm not-italic tracking-normal">
                  {soundEnabled ? '♪' : '⌀'}
                </span>
                SFX {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="flex-1">
              <Section />
            </div>
            <ButtonPromptBar prompts={[{ key: 'A', label: 'Confirm' }, { key: 'B', label: 'Return' }]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
