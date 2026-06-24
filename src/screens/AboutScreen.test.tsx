import { render, screen } from '@testing-library/react'
import { AboutScreen } from './AboutScreen'
import { content } from '../data/content'

test('renders name, role, and bio from content', () => {
  render(<AboutScreen />)
  expect(screen.getByText(content.about.name)).toBeInTheDocument()
  expect(screen.getByText(content.about.role)).toBeInTheDocument()
  expect(screen.getByText(content.about.bio)).toBeInTheDocument()
})
