import { getTransitionVariants } from './transitionVariants'

test('getTransitionVariants(true) returns static opacity-1 variants (no scale movement)', () => {
  const variants = getTransitionVariants(true)
  expect(variants.initial).toEqual({ opacity: 1 })
  expect(variants.animate).toEqual({ opacity: 1 })
  expect(variants.exit).toEqual({ opacity: 1 })
})

test('getTransitionVariants(false) returns opacity/scale animation variants', () => {
  const variants = getTransitionVariants(false)
  expect(variants.initial).toEqual({ opacity: 0, scale: 0.98 })
  expect(variants.animate).toEqual({ opacity: 1, scale: 1 })
  expect(variants.exit).toEqual({ opacity: 0, scale: 1.02 })
})
