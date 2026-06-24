import { createSoundPlayer } from './useSound'

test('does not play when disabled', () => {
  const played: string[] = []
  const player = createSoundPlayer({ enabled: () => false, play: (n) => played.push(n) })
  player.trigger('select')
  expect(played).toEqual([])
})

test('plays when enabled', () => {
  const played: string[] = []
  const player = createSoundPlayer({ enabled: () => true, play: (n) => played.push(n) })
  player.trigger('select')
  expect(played).toEqual(['select'])
})
