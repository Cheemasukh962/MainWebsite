import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectsScreen } from './ProjectsScreen'
import { content } from '../data/content'

test('lists every project as a capsule', () => {
  render(<ProjectsScreen />)
  for (const p of content.projects) {
    expect(screen.getByRole('button', { name: new RegExp(p.title, 'i') })).toBeInTheDocument()
  }
})

test('shows details for the selected project', async () => {
  render(<ProjectsScreen />)
  const last = content.projects[content.projects.length - 1]
  await userEvent.click(screen.getByRole('button', { name: new RegExp(last.title, 'i') }))
  expect(screen.getByText(last.description)).toBeInTheDocument()
  for (const tag of last.tags) {
    expect(screen.getByText(tag)).toBeInTheDocument()
  }
})
