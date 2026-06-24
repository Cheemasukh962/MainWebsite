export function ButtonPromptBar({ prompts }: { prompts: { key: string; label: string }[] }) {
  return (
    <div className="flex items-center justify-end gap-4 border-t-2 border-gold bg-ki-900/80 px-4 py-2 text-sm text-white">
      {prompts.map((p) => (
        <span key={p.key} className="flex items-center gap-1">
          <span className="rounded-full border border-white px-2">{p.key}</span>
          {p.label}
        </span>
      ))}
    </div>
  )
}
