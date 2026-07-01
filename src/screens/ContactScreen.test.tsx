import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactScreen } from './ContactScreen'
import { content } from '../data/content'

test('renders a roster tile for every contact', () => {
  render(<ContactScreen />)
  for (const c of content.contacts) {
    expect(screen.getByRole('button', { name: c.label })).toBeInTheDocument()
  }
})

test('active contact renders an OPEN PROFILE link with correct href', () => {
  render(<ContactScreen />)
  const first = content.contacts[0]
  const link = screen.getByRole('link', { name: /open profile/i })
  expect(link).toHaveAttribute('href', first.url)
})

test('selecting a roster tile swaps the portrait', async () => {
  render(<ContactScreen />)
  const target = content.contacts.find((c) => c.id === 'em') ?? content.contacts[1]
  await userEvent.click(screen.getByRole('button', { name: target.label }))
  if (target.description) {
    expect(screen.getByText(target.description)).toBeInTheDocument()
  }
  const link = screen.getByRole('link', { name: /open profile/i })
  expect(link).toHaveAttribute('href', target.url)
})
