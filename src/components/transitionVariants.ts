export interface TransitionVariants {
  initial: { opacity: number; scale?: number }
  animate: { opacity: number; scale?: number }
  exit: { opacity: number; scale?: number }
}

export function getTransitionVariants(reduce: boolean): TransitionVariants {
  return reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.02 } }
}
