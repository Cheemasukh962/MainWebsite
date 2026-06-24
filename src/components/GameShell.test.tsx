import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameShell } from './GameShell'
import { content } from '../data/content'

test('full flow: boot -> hub -> skills -> return to hub', async () => {
  render(<GameShell />)
  // Boot
  await userEvent.click(screen.getByRole('button', { name: /press start/i }))
  // Hub
  await userEvent.click(screen.getByRole('button', { name: /^skills$/i }))
  // Skills screen shows training level
  expect(screen.getByText(new RegExp(`${content.trainingLevel}%`))).toBeInTheDocument()
  // Return to hub
  await userEvent.click(screen.getByRole('button', { name: /return/i }))
  expect(screen.getByRole('button', { name: /^projects$/i })).toBeInTheDocument()
})

test('jump-nav switches sections without returning to hub', async () => {
  render(<GameShell />)
  await userEvent.click(screen.getByRole('button', { name: /press start/i }))
  await userEvent.click(screen.getByRole('button', { name: /about me/i }))
  await userEvent.click(screen.getByRole('button', { name: /^projects$/i }))
  expect(screen.getByText(content.projects[0].description)).toBeInTheDocument()
})
