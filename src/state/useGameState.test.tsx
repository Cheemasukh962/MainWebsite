import { renderHook, act } from '@testing-library/react'
import { useGameState } from './useGameState'

test('starts on boot screen, sound off', () => {
  const { result } = renderHook(() => useGameState())
  expect(result.current.screen).toBe('boot')
  expect(result.current.soundEnabled).toBe(false)
})

test('startGame moves to hub', () => {
  const { result } = renderHook(() => useGameState())
  act(() => result.current.startGame())
  expect(result.current.screen).toBe('hub')
})

test('goTo switches screens and toggleSound flips sound', () => {
  const { result } = renderHook(() => useGameState())
  act(() => result.current.goTo('skills'))
  expect(result.current.screen).toBe('skills')
  act(() => result.current.toggleSound())
  expect(result.current.soundEnabled).toBe(true)
})
