import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BootScreen } from './BootScreen'

test('PRESS START calls onStart', async () => {
  const onStart = vi.fn()
  render(<BootScreen onStart={onStart} />)
  await userEvent.click(screen.getByRole('button', { name: /press start/i }))
  expect(onStart).toHaveBeenCalledTimes(1)
})

test('Skip calls onStart', async () => {
  const onStart = vi.fn()
  render(<BootScreen onStart={onStart} />)
  await userEvent.click(screen.getByRole('button', { name: /skip/i }))
  expect(onStart).toHaveBeenCalledTimes(1)
})
