import { render, screen } from '@testing-library/react'
import { ContactScreen } from './ContactScreen'
import { content } from '../data/content'

test('renders each contact as a link with correct href', () => {
  render(<ContactScreen />)
  for (const c of content.contacts) {
    const link = screen.getByRole('link', { name: new RegExp(c.label, 'i') })
    expect(link).toHaveAttribute('href', c.url)
  }
})

test('renders experience entries', () => {
  render(<ContactScreen />)
  for (const e of content.experience) {
    expect(screen.getByText(new RegExp(e.role, 'i'))).toBeInTheDocument()
  }
})
