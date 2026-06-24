import React from 'react'
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

const SECTION_COMPONENTS: Record<SectionId, () => React.JSX.Element> = {
  about: AboutScreen,
  skills: SkillsScreen,
  projects: ProjectsScreen,
  contact: ContactScreen,
}

export function GameShell() {
  const { screen, soundEnabled, goTo, startGame, toggleSound } = useGameState()
  const reduce = useReducedMotion()
  const anim = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.02 } }

  const isSection = screen !== 'boot' && screen !== 'hub'
  const Section = isSection ? SECTION_COMPONENTS[screen as SectionId] : null

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
            <MainHub onSelect={(s) => goTo(s)} />
          </motion.div>
        )}
        {isSection && Section && (
          <motion.div key={screen} {...anim} className="flex min-h-screen flex-col">
            <div className="flex items-center justify-between">
              <JumpNav active={screen as SectionId} onJump={(s) => goTo(s)} onReturn={() => goTo('hub')} />
              <button onClick={toggleSound} className="mr-4 text-sm text-ki-200 underline">
                {soundEnabled ? 'Sound: On' : 'Sound: Off'}
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
