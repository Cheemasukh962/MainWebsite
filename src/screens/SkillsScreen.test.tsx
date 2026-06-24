import { render, screen } from '@testing-library/react'
import { SkillsScreen } from './SkillsScreen'
import { content } from '../data/content'

test('renders training level and every skill with its rank', () => {
  render(<SkillsScreen />)
  expect(screen.getByText(new RegExp(`${content.trainingLevel}%`))).toBeInTheDocument()
  for (const s of content.skills) {
    expect(screen.getByText(s.name)).toBeInTheDocument()
  }
})

test('shows COMPLETE only for maxed skills', () => {
  render(<SkillsScreen />)
  const maxed = content.skills.filter((s) => s.level >= 100).length
  expect(screen.queryAllByText(/complete/i)).toHaveLength(maxed)
})
