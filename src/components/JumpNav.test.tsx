import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JumpNav } from './JumpNav'

test('marks the active section', () => {
  render(<JumpNav active="skills" onJump={() => {}} onReturn={() => {}} />)
  expect(screen.getByRole('button', { name: /skills/i })).toHaveAttribute('aria-current', 'page')
})

test('jumping and returning fire callbacks', async () => {
  const onJump = vi.fn()
  const onReturn = vi.fn()
  render(<JumpNav active="about" onJump={onJump} onReturn={onReturn} />)
  await userEvent.click(screen.getByRole('button', { name: /projects/i }))
  expect(onJump).toHaveBeenCalledWith('projects')
  await userEvent.click(screen.getByRole('button', { name: /return/i }))
  expect(onReturn).toHaveBeenCalledTimes(1)
})
