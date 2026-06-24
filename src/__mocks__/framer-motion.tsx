import React from 'react'

type MotionProps = React.HTMLAttributes<HTMLElement> & {
  initial?: unknown
  animate?: unknown
  exit?: unknown
  transition?: unknown
  layout?: unknown
  layoutId?: unknown
  variants?: unknown
  whileHover?: unknown
  whileTap?: unknown
  whileFocus?: unknown
  whileDrag?: unknown
  whileInView?: unknown
  onAnimationComplete?: unknown
  onAnimationStart?: unknown
}

function makeMotion(Tag: string) {
  return React.forwardRef<HTMLElement, MotionProps>(
    (
      {
        initial: _i,
        animate: _a,
        exit: _e,
        transition: _t,
        layout: _l,
        layoutId: _lid,
        variants: _v,
        whileHover: _wh,
        whileTap: _wt,
        whileFocus: _wf,
        whileDrag: _wd,
        whileInView: _wiv,
        onAnimationComplete: _oac,
        onAnimationStart: _oas,
        ...rest
      },
      ref,
    ) =>
      React.createElement(Tag, { ...rest, ref }),
  )
}

export const motion = new Proxy(
  {},
  {
    get(_target, prop: string) {
      return makeMotion(prop)
    },
  },
) as Record<string, ReturnType<typeof makeMotion>>

export function AnimatePresence({ children }: { children: React.ReactNode; mode?: string }) {
  return <>{children}</>
}

export function useReducedMotion() {
  return false
}

export function useAnimation() {
  return {
    start: () => Promise.resolve(),
    stop: () => {},
    set: () => {},
  }
}
