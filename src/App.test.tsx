import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the boot screen first', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: /press start/i })).toBeInTheDocument()
})
