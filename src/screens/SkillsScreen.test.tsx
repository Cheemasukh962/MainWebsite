import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SkillsScreen } from './SkillsScreen'
import { content } from '../data/content'

test('renders total mastery training level', () => {
  render(<SkillsScreen />)
  expect(screen.getByText(new RegExp(`${content.trainingLevel}%`))).toBeInTheDocument()
})

test('renders a badge button for every skill', () => {
  render(<SkillsScreen />)
  for (const s of content.skills) {
    expect(screen.getByRole('button', { name: s.name })).toBeInTheDocument()
  }
})

test('selecting a badge shows its detail panel', async () => {
  render(<SkillsScreen />)
  const target = content.skills.find((s) => s.id === 'ts') ?? content.skills[1]
  await userEvent.click(screen.getByRole('button', { name: target.name }))
  if (target.description) {
    expect(screen.getByText(target.description)).toBeInTheDocument()
  }
  if (target.mastery && target.mastery.length > 0) {
    expect(screen.getByText(target.mastery[0])).toBeInTheDocument()
  }
})
