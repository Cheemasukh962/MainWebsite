import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar } from './Avatar'

test('renders an image with alt text', () => {
  render(<Avatar src="/avatar.png" alt="Zukai" />)
  expect(screen.getByAltText('Zukai')).toBeInTheDocument()
})

test('shows fallback when image fails to load', () => {
  render(<Avatar src="/missing.png" alt="Zukai" />)
  fireEvent.error(screen.getByAltText('Zukai'))
  expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument()
})
