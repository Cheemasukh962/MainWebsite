import { render, screen } from '@testing-library/react'
import { ButtonPromptBar } from './ButtonPromptBar'

test('renders prompts', () => {
  render(<ButtonPromptBar prompts={[{ key: 'A', label: 'Confirm' }, { key: 'B', label: 'Return' }]} />)
  expect(screen.getByText('Confirm')).toBeInTheDocument()
  expect(screen.getByText('Return')).toBeInTheDocument()
})
