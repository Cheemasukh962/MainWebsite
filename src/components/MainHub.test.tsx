import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MainHub } from './MainHub'

test('renders four section options', () => {
  render(<MainHub onSelect={() => {}} />)
  for (const label of [/about me/i, /skills/i, /projects/i, /contact/i]) {
    expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
  }
})

test('selecting projects calls onSelect with "projects"', async () => {
  const onSelect = vi.fn()
  render(<MainHub onSelect={onSelect} />)
  await userEvent.click(screen.getByRole('button', { name: /projects/i }))
  expect(onSelect).toHaveBeenCalledWith('projects')
})
