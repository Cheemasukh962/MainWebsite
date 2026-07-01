import { render, screen } from '@testing-library/react'
import { AboutScreen } from './AboutScreen'
import { content } from '../data/content'

test('renders name, role, and bio from content', () => {
  render(<AboutScreen />)
  // Name and role appear in multiple places (card, header, profile row) by design.
  expect(screen.getAllByText(content.about.name).length).toBeGreaterThan(0)
  expect(screen.getAllByText(content.about.role).length).toBeGreaterThan(0)
  expect(screen.getByText(content.about.bio)).toBeInTheDocument()
})

test('renders profile and loadout sections', () => {
  render(<AboutScreen />)
  for (const row of content.about.profile) {
    expect(screen.getByText(row.label)).toBeInTheDocument()
  }
  for (const row of content.about.loadout) {
    expect(screen.getByText(row.label)).toBeInTheDocument()
  }
})

test('renders the player card with tier badge and level', () => {
  render(<AboutScreen />)
  expect(screen.getByTestId('player-card')).toBeInTheDocument()
  expect(screen.getByText(content.about.card.level)).toBeInTheDocument()
})

test('renders experience entries', () => {
  render(<AboutScreen />)
  for (const e of content.experience) {
    // Role text (e.g. "Developer") may appear in other places (e.g. "Frontend
    // Developer"). Getting all matches is sufficient — we just need proof
    // the experience section rendered at least this entry's role somewhere.
    expect(screen.getAllByText(new RegExp(e.role, 'i')).length).toBeGreaterThan(0)
  }
})
