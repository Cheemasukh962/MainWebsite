export function BootScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <button
        onClick={onStart}
        className="animate-pulse text-4xl font-bold tracking-widest text-ki-200"
      >
        PRESS START
      </button>
      <button onClick={onStart} className="mt-8 text-sm text-gray-400 underline">
        Skip
      </button>
    </div>
  )
}
