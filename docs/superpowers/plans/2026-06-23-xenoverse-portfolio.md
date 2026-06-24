# Xenoverse Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a heavily gamified personal portfolio SPA styled as a Dragon Ball Xenoverse menu system, with a boot intro, a main hub, and four themed content screens.

**Architecture:** A single React + TypeScript SPA. A `GameShell` holds all navigation/UI state (current screen, sound on/off, boot done) and orchestrates Framer Motion transitions between a `BootScreen`, a `MainHub`, and four themed screen components. All personal content lives in one typed static data file (`content.ts`) so layout is fully decoupled from data. The `Avatar` is an isolated component (2D now, 3D-swappable later).

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS, Framer Motion, Vitest + React Testing Library + jsdom.

## Global Constraints

- TypeScript strict mode on. No `any` in committed code.
- All personal content (bio, skills, projects, contact, experience) lives only in `src/data/content.ts`. Screen components never hardcode content.
- `Avatar` consumers depend only on its props, never on its internal rendering (2D image now; must be swappable to 3D later with no consumer change).
- Sound never plays when `soundEnabled` is false. No audio before a user gesture.
- Respect `prefers-reduced-motion`: heavy animations degrade to instant/cross-fade.
- Screen identifiers are exactly: `'boot' | 'hub' | 'about' | 'skills' | 'projects' | 'contact'`.
- Test runner command: `npm test`. Single test: `npm test -- <pattern>`.

---

### Task 1: Project scaffold + tooling

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `postcss.config.js`, `tailwind.config.js`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/setupTests.ts`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: a runnable Vite app; `App` default export (React component); working `npm test` (Vitest + jsdom + RTL).

- [ ] **Step 1: Initialize git and scaffold**

```bash
cd /c/Users/cheem/websiteddd
git init
printf "node_modules\ndist\n.DS_Store\n*.local\n" > .gitignore
npm create vite@latest . -- --template react-ts
```

If `npm create vite` refuses because the directory is non-empty, scaffold into a temp dir and copy: `npm create vite@latest tmpapp -- --template react-ts && cp -r tmpapp/* tmpapp/.* . 2>/dev/null; rm -rf tmpapp`.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind** — replace `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ki: { 50: '#eaf4ff', 200: '#9fd0ff', 400: '#37a0ff', 600: '#1565c0', 900: '#06234a' },
        gold: '#f2c14e',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Set up Tailwind + Vitest config**

Replace `src/index.css` top with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Replace `vite.config.ts`:
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
```

Create `src/setupTests.ts`:
```ts
import '@testing-library/jest-dom'
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 5: Write the failing smoke test** — `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the app root', () => {
  render(<App />)
  expect(screen.getByTestId('app-root')).toBeInTheDocument()
})
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm test -- App`
Expected: FAIL (no `app-root` testid).

- [ ] **Step 7: Minimal implementation** — replace `src/App.tsx`:

```tsx
export default function App() {
  return <div data-testid="app-root" className="min-h-screen bg-ki-900 text-white" />
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm test -- App`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TS + Tailwind + Vitest"
```

---

### Task 2: Content data model

**Files:**
- Create: `src/data/types.ts`, `src/data/content.ts`
- Test: `src/data/content.test.ts`

**Interfaces:**
- Produces:
  - `type Rank = 'S' | 'A' | 'B' | 'C'`
  - `interface Skill { name: string; rank: Rank; level: number }` (level 0–100)
  - `interface Project { id: string; title: string; description: string; tags: string[]; links: { label: string; url: string }[] }`
  - `interface ContactLink { id: string; label: string; url: string; icon: string }`
  - `interface ExperienceEntry { id: string; role: string; org: string; period: string }`
  - `interface Content { about: { name: string; role: string; bio: string; avatar: string }; trainingLevel: number; skills: Skill[]; projects: Project[]; contacts: ContactLink[]; experience: ExperienceEntry[] }`
  - `const content: Content` (default export-style named export).

- [ ] **Step 1: Write the failing test** — `src/data/content.test.ts`:

```ts
import { content } from './content'

test('content has all required sections populated', () => {
  expect(content.about.name).toBeTruthy()
  expect(content.skills.length).toBeGreaterThan(0)
  expect(content.projects.length).toBeGreaterThan(0)
  expect(content.contacts.length).toBeGreaterThan(0)
})

test('every skill level is between 0 and 100 with a valid rank', () => {
  for (const s of content.skills) {
    expect(s.level).toBeGreaterThanOrEqual(0)
    expect(s.level).toBeLessThanOrEqual(100)
    expect(['S', 'A', 'B', 'C']).toContain(s.rank)
  }
})

test('project and contact ids are unique', () => {
  const pids = content.projects.map((p) => p.id)
  const cids = content.contacts.map((c) => c.id)
  expect(new Set(pids).size).toBe(pids.length)
  expect(new Set(cids).size).toBe(cids.length)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- content`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement types** — `src/data/types.ts`:

```ts
export type Rank = 'S' | 'A' | 'B' | 'C'

export interface Skill { name: string; rank: Rank; level: number }
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  links: { label: string; url: string }[]
}
export interface ContactLink { id: string; label: string; url: string; icon: string }
export interface ExperienceEntry { id: string; role: string; org: string; period: string }

export interface Content {
  about: { name: string; role: string; bio: string; avatar: string }
  trainingLevel: number
  skills: Skill[]
  projects: Project[]
  contacts: ContactLink[]
  experience: ExperienceEntry[]
}
```

- [ ] **Step 4: Implement content** — `src/data/content.ts` (placeholder personal data the user edits later):

```ts
import type { Content } from './types'

export const content: Content = {
  about: {
    name: 'Zukai',
    role: 'Frontend Developer',
    bio: 'Building gamified web experiences. Replace this with your own bio.',
    avatar: '/avatar.png',
  },
  trainingLevel: 48,
  skills: [
    { name: 'React', rank: 'S', level: 90 },
    { name: 'TypeScript', rank: 'A', level: 80 },
    { name: 'CSS / Tailwind', rank: 'A', level: 78 },
    { name: 'Node.js', rank: 'B', level: 60 },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Project Alpha',
      description: 'Replace with a real project description.',
      tags: ['React', 'TypeScript'],
      links: [{ label: 'GitHub', url: 'https://github.com/' }],
    },
  ],
  contacts: [
    { id: 'gh', label: 'GitHub', url: 'https://github.com/', icon: 'github' },
    { id: 'li', label: 'LinkedIn', url: 'https://linkedin.com/', icon: 'linkedin' },
    { id: 'em', label: 'Email', url: 'mailto:cheemasukh966@gmail.com', icon: 'mail' },
  ],
  experience: [
    { id: 'exp-1', role: 'Developer', org: 'Self', period: '2026' },
  ],
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- content`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add typed content data model"
```

---

### Task 3: Sound helper

**Files:**
- Create: `src/sound/useSound.ts`
- Test: `src/sound/useSound.test.ts`

**Interfaces:**
- Produces: `function createSoundPlayer(opts: { enabled: () => boolean; play: (name: string) => void }): { trigger: (name: string) => void }` — `trigger` calls `play` only when `enabled()` returns true. (The injected `play` lets tests assert without real audio.)

- [ ] **Step 1: Write the failing test** — `src/sound/useSound.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- useSound`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/sound/useSound.ts`:

```ts
export interface SoundOptions {
  enabled: () => boolean
  play: (name: string) => void
}

export function createSoundPlayer(opts: SoundOptions) {
  return {
    trigger(name: string) {
      if (opts.enabled()) opts.play(name)
    },
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- useSound`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add mutable sound player helper"
```

---

### Task 4: GameShell navigation state

**Files:**
- Create: `src/state/useGameState.ts`
- Test: `src/state/useGameState.test.tsx`

**Interfaces:**
- Produces:
  - `type ScreenId = 'boot' | 'hub' | 'about' | 'skills' | 'projects' | 'contact'`
  - `type SectionId = 'about' | 'skills' | 'projects' | 'contact'`
  - `function useGameState(): { screen: ScreenId; soundEnabled: boolean; goTo: (s: ScreenId) => void; startGame: () => void; toggleSound: () => void }` — `startGame` sets screen to `'hub'`; initial screen is `'boot'`.

- [ ] **Step 1: Write the failing test** — `src/state/useGameState.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- useGameState`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/state/useGameState.ts`:

```ts
import { useCallback, useState } from 'react'

export type ScreenId = 'boot' | 'hub' | 'about' | 'skills' | 'projects' | 'contact'
export type SectionId = 'about' | 'skills' | 'projects' | 'contact'

export function useGameState() {
  const [screen, setScreen] = useState<ScreenId>('boot')
  const [soundEnabled, setSoundEnabled] = useState(false)

  const goTo = useCallback((s: ScreenId) => setScreen(s), [])
  const startGame = useCallback(() => setScreen('hub'), [])
  const toggleSound = useCallback(() => setSoundEnabled((v) => !v), [])

  return { screen, soundEnabled, goTo, startGame, toggleSound }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- useGameState`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add game navigation state hook"
```

---

### Task 5: BootScreen

**Files:**
- Create: `src/components/BootScreen.tsx`
- Test: `src/components/BootScreen.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `function BootScreen(props: { onStart: () => void }): JSX.Element` — renders a "PRESS START" button and a "Skip" button; both call `onStart`.

- [ ] **Step 1: Write the failing test** — `src/components/BootScreen.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- BootScreen`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/components/BootScreen.tsx`:

```tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- BootScreen`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add BootScreen with start and skip"
```

---

### Task 6: MainHub

**Files:**
- Create: `src/components/MainHub.tsx`
- Test: `src/components/MainHub.test.tsx`

**Interfaces:**
- Consumes: `SectionId` from `src/state/useGameState.ts`.
- Produces: `function MainHub(props: { onSelect: (s: SectionId) => void }): JSX.Element` — renders four buttons (About Me, Skills, Projects, Contact); each calls `onSelect` with its section id.

- [ ] **Step 1: Write the failing test** — `src/components/MainHub.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MainHub } from './MainHub'

test('renders four section options', () => {
  render(<MainHub onSelect={() => {}} />)
  for (const label of [/about me/i, /skills/i, /projects/i, /contact/i]) {
    expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
  }
})

test('selecting projects calls onSelect with "projects"', async () => {
  const onSelect = vi.fn()
  render(<MainHub onSelect={onSelect} />)
  await userEvent.click(screen.getByRole('button', { name: /projects/i }))
  expect(onSelect).toHaveBeenCalledWith('projects')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- MainHub`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/components/MainHub.tsx`:

```tsx
import type { SectionId } from '../state/useGameState'

const OPTIONS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function MainHub({ onSelect }: { onSelect: (s: SectionId) => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-ki-900">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => onSelect(o.id)}
          className="w-72 rounded border-2 border-gold bg-ki-600/40 px-6 py-3 text-left text-xl text-white hover:bg-ki-400/40"
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- MainHub`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add MainHub menu"
```

---

### Task 7: JumpNav and ButtonPromptBar

**Files:**
- Create: `src/components/JumpNav.tsx`, `src/components/ButtonPromptBar.tsx`
- Test: `src/components/JumpNav.test.tsx`, `src/components/ButtonPromptBar.test.tsx`

**Interfaces:**
- Consumes: `SectionId`.
- Produces:
  - `function JumpNav(props: { active: SectionId; onJump: (s: SectionId) => void; onReturn: () => void }): JSX.Element` — four section tabs + a Return button; the active tab has `aria-current="page"`.
  - `function ButtonPromptBar(props: { prompts: { key: string; label: string }[] }): JSX.Element` — renders each prompt as `key label`.

- [ ] **Step 1: Write the failing tests**

`src/components/JumpNav.test.tsx`:
```tsx
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
```

`src/components/ButtonPromptBar.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { ButtonPromptBar } from './ButtonPromptBar'

test('renders prompts', () => {
  render(<ButtonPromptBar prompts={[{ key: 'A', label: 'Confirm' }, { key: 'B', label: 'Return' }]} />)
  expect(screen.getByText('Confirm')).toBeInTheDocument()
  expect(screen.getByText('Return')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- JumpNav ButtonPromptBar`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement** — `src/components/JumpNav.tsx`:

```tsx
import type { SectionId } from '../state/useGameState'

const TABS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function JumpNav({
  active,
  onJump,
  onReturn,
}: {
  active: SectionId
  onJump: (s: SectionId) => void
  onReturn: () => void
}) {
  return (
    <nav className="flex items-center gap-2 border-b-2 border-gold bg-ki-900/80 px-4 py-2">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onJump(t.id)}
          aria-current={active === t.id ? 'page' : undefined}
          className={`rounded px-3 py-1 text-sm ${active === t.id ? 'bg-gold text-ki-900' : 'text-white hover:bg-ki-600/40'}`}
        >
          {t.label}
        </button>
      ))}
      <button onClick={onReturn} className="ml-auto rounded px-3 py-1 text-sm text-white hover:bg-ki-600/40">
        Return
      </button>
    </nav>
  )
}
```

`src/components/ButtonPromptBar.tsx`:
```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- JumpNav ButtonPromptBar`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add JumpNav and ButtonPromptBar chrome"
```

---

### Task 8: Avatar (2D, swappable)

**Files:**
- Create: `src/components/Avatar.tsx`
- Test: `src/components/Avatar.test.tsx`

**Interfaces:**
- Produces: `function Avatar(props: { src: string; alt: string }): JSX.Element` — renders an `<img>`; on image error, shows a fallback silhouette (`data-testid="avatar-fallback"`) instead of a broken image. Consumers pass only `src`/`alt` (the 3D swap will keep this signature).

- [ ] **Step 1: Write the failing test** — `src/components/Avatar.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar } from './Avatar'

test('renders an image with alt text', () => {
  render(<Avatar src="/avatar.png" alt="Zukai" />)
  expect(screen.getByAltText('Zukai')).toBeInTheDocument()
})

test('shows fallback when image fails to load', () => {
  render(<Avatar src="/missing.png" alt="Zukai" />)
  fireEvent.error(screen.getByAltText('Zukai'))
  expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Avatar`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/components/Avatar.tsx`:

```tsx
import { useState } from 'react'

export function Avatar({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        data-testid="avatar-fallback"
        aria-label={alt}
        className="h-64 w-40 rounded-full bg-ki-600/50 shadow-[0_0_40px] shadow-ki-400"
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-80 animate-[float_3s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(55,160,255,0.6)]"
    />
  )
}
```

Add the `float` keyframes to `src/index.css`:
```css
@keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Avatar`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add swappable 2D Avatar with fallback"
```

---

### Task 9: AboutScreen

**Files:**
- Create: `src/screens/AboutScreen.tsx`
- Test: `src/screens/AboutScreen.test.tsx`

**Interfaces:**
- Consumes: `content` from `src/data/content.ts`, `Avatar`.
- Produces: `function AboutScreen(): JSX.Element` — renders the about name, role, bio, and an `Avatar`.

- [ ] **Step 1: Write the failing test** — `src/screens/AboutScreen.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { AboutScreen } from './AboutScreen'
import { content } from '../data/content'

test('renders name, role, and bio from content', () => {
  render(<AboutScreen />)
  expect(screen.getByText(content.about.name)).toBeInTheDocument()
  expect(screen.getByText(content.about.role)).toBeInTheDocument()
  expect(screen.getByText(content.about.bio)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- AboutScreen`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/screens/AboutScreen.tsx`:

```tsx
import { content } from '../data/content'
import { Avatar } from '../components/Avatar'

export function AboutScreen() {
  const { name, role, bio, avatar } = content.about
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_auto]">
      <div className="rounded-lg border-2 border-gold bg-ki-600/30 p-6 text-white">
        <h1 className="text-3xl font-bold text-gold">{name}</h1>
        <p className="mt-1 text-ki-200">{role}</p>
        <p className="mt-4 leading-relaxed">{bio}</p>
      </div>
      <div className="flex items-end justify-center">
        <Avatar src={avatar} alt={name} />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- AboutScreen`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add AboutScreen (Customize card theme)"
```

---

### Task 10: SkillsScreen

**Files:**
- Create: `src/screens/SkillsScreen.tsx`
- Test: `src/screens/SkillsScreen.test.tsx`

**Interfaces:**
- Consumes: `content`.
- Produces: `function SkillsScreen(): JSX.Element` — renders a Total Training Level bar (label includes the `trainingLevel` percentage), and one tile per skill showing name + rank, with `COMPLETE` shown when `level >= 100`.

- [ ] **Step 1: Write the failing test** — `src/screens/SkillsScreen.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { SkillsScreen } from './SkillsScreen'
import { content } from '../data/content'

test('renders training level and every skill with its rank', () => {
  render(<SkillsScreen />)
  expect(screen.getByText(new RegExp(`${content.trainingLevel}%`))).toBeInTheDocument()
  for (const s of content.skills) {
    expect(screen.getByText(s.name)).toBeInTheDocument()
  }
})

test('shows COMPLETE only for maxed skills', () => {
  render(<SkillsScreen />)
  const maxed = content.skills.filter((s) => s.level >= 100).length
  expect(screen.queryAllByText(/complete/i)).toHaveLength(maxed)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- SkillsScreen`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/screens/SkillsScreen.tsx`:

```tsx
import { content } from '../data/content'

export function SkillsScreen() {
  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-sm text-ki-200">
          <span>Total Training Level</span>
          <span>{content.trainingLevel}%</span>
        </div>
        <div className="h-4 rounded-full border-2 border-gold bg-ki-900">
          <div
            className="h-full rounded-full bg-gold"
            style={{ width: `${content.trainingLevel}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {content.skills.map((s) => (
          <div
            key={s.name}
            className="relative flex flex-col items-center rounded-lg border-2 border-ki-400 bg-ki-600/30 p-4"
          >
            {s.level >= 100 && (
              <span className="absolute -top-2 right-2 rotate-6 rounded bg-red-600 px-2 text-xs font-bold">
                COMPLETE
              </span>
            )}
            <span className="text-2xl font-bold text-gold">{s.rank}</span>
            <span className="mt-2 text-center text-sm">{s.name}</span>
            <div className="mt-2 h-2 w-full rounded-full bg-ki-900">
              <div className="h-full rounded-full bg-ki-400" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- SkillsScreen`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add SkillsScreen (Play Data theme)"
```

---

### Task 11: ProjectsScreen

**Files:**
- Create: `src/screens/ProjectsScreen.tsx`
- Test: `src/screens/ProjectsScreen.test.tsx`

**Interfaces:**
- Consumes: `content`.
- Produces: `function ProjectsScreen(): JSX.Element` — a capsule list (one button per project) on the left; selecting a project shows its description, tags, and links in a detail panel. First project selected by default.

- [ ] **Step 1: Write the failing test** — `src/screens/ProjectsScreen.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectsScreen } from './ProjectsScreen'
import { content } from '../data/content'

test('lists every project as a capsule', () => {
  render(<ProjectsScreen />)
  for (const p of content.projects) {
    expect(screen.getByRole('button', { name: new RegExp(p.title, 'i') })).toBeInTheDocument()
  }
})

test('shows details for the selected project', async () => {
  render(<ProjectsScreen />)
  const last = content.projects[content.projects.length - 1]
  await userEvent.click(screen.getByRole('button', { name: new RegExp(last.title, 'i') }))
  expect(screen.getByText(last.description)).toBeInTheDocument()
  for (const tag of last.tags) {
    expect(screen.getByText(tag)).toBeInTheDocument()
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ProjectsScreen`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/screens/ProjectsScreen.tsx`:

```tsx
import { useState } from 'react'
import { content } from '../data/content'

export function ProjectsScreen() {
  const [selectedId, setSelectedId] = useState(content.projects[0]?.id)
  const selected = content.projects.find((p) => p.id === selectedId)
  return (
    <div className="grid grid-cols-1 gap-4 p-6 text-white md:grid-cols-2">
      <ul className="space-y-2">
        {content.projects.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => setSelectedId(p.id)}
              className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left ${
                p.id === selectedId ? 'border-gold bg-ki-400/30' : 'border-ki-400 bg-ki-600/20'
              }`}
            >
              <span className="h-6 w-6 rounded-full bg-ki-400 shadow-[0_0_12px] shadow-ki-200" />
              {p.title}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <div className="rounded-lg border-2 border-gold bg-ki-600/30 p-5">
          <h2 className="text-xl font-bold text-gold">{selected.title}</h2>
          <p className="mt-3 leading-relaxed">{selected.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.tags.map((t) => (
              <span key={t} className="rounded-full border border-ki-200 px-2 py-0.5 text-xs text-ki-200">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {selected.links.map((l) => (
              <a key={l.url} href={l.url} className="text-gold underline" target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ProjectsScreen`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add ProjectsScreen (Item Select theme)"
```

---

### Task 12: ContactScreen

**Files:**
- Create: `src/screens/ContactScreen.tsx`
- Test: `src/screens/ContactScreen.test.tsx`

**Interfaces:**
- Consumes: `content`.
- Produces: `function ContactScreen(): JSX.Element` — a roster grid where each contact is a link (`<a href>`); optional experience entries listed below.

- [ ] **Step 1: Write the failing test** — `src/screens/ContactScreen.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { ContactScreen } from './ContactScreen'
import { content } from '../data/content'

test('renders each contact as a link with correct href', () => {
  render(<ContactScreen />)
  for (const c of content.contacts) {
    const link = screen.getByRole('link', { name: new RegExp(c.label, 'i') })
    expect(link).toHaveAttribute('href', c.url)
  }
})

test('renders experience entries', () => {
  render(<ContactScreen />)
  for (const e of content.experience) {
    expect(screen.getByText(new RegExp(e.role, 'i'))).toBeInTheDocument()
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ContactScreen`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/screens/ContactScreen.tsx`:

```tsx
import { content } from '../data/content'

export function ContactScreen() {
  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {content.contacts.map((c) => (
          <a
            key={c.id}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            className="flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-ki-400 bg-ki-600/30 text-center hover:border-gold hover:bg-ki-400/30"
          >
            <span className="text-sm font-bold">{c.label}</span>
          </a>
        ))}
      </div>
      {content.experience.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-gold">Experience</h2>
          <ul className="space-y-2">
            {content.experience.map((e) => (
              <li key={e.id} className="rounded border-l-4 border-gold bg-ki-600/20 px-4 py-2">
                <span className="font-bold">{e.role}</span> — {e.org}{' '}
                <span className="text-ki-200">({e.period})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ContactScreen`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add ContactScreen (Character Select theme)"
```

---

### Task 13: GameShell wiring + transitions + reduced motion

**Files:**
- Create: `src/components/GameShell.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/GameShell.test.tsx`

**Interfaces:**
- Consumes: `useGameState`, `BootScreen`, `MainHub`, `JumpNav`, `ButtonPromptBar`, all four screens.
- Produces: `function GameShell(): JSX.Element` — the full app: boot → hub → screens, with JumpNav + ButtonPromptBar shown inside section screens, a sound mute toggle, and Framer Motion transitions that respect `prefers-reduced-motion`.

- [ ] **Step 1: Write the failing test** — `src/components/GameShell.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameShell } from './GameShell'
import { content } from '../data/content'

test('full flow: boot -> hub -> skills -> return to hub', async () => {
  render(<GameShell />)
  // Boot
  await userEvent.click(screen.getByRole('button', { name: /press start/i }))
  // Hub
  await userEvent.click(screen.getByRole('button', { name: /^skills$/i }))
  // Skills screen shows training level
  expect(screen.getByText(new RegExp(`${content.trainingLevel}%`))).toBeInTheDocument()
  // Return to hub
  await userEvent.click(screen.getByRole('button', { name: /return/i }))
  expect(screen.getByRole('button', { name: /^projects$/i })).toBeInTheDocument()
})

test('jump-nav switches sections without returning to hub', async () => {
  render(<GameShell />)
  await userEvent.click(screen.getByRole('button', { name: /press start/i }))
  await userEvent.click(screen.getByRole('button', { name: /about me/i }))
  await userEvent.click(screen.getByRole('button', { name: /^projects$/i }))
  expect(screen.getByText(content.projects[0].description)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- GameShell`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement** — `src/components/GameShell.tsx`:

```tsx
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useGameState, type SectionId } from '../state/useGameState'
import { BootScreen } from './BootScreen'
import { MainHub } from './MainHub'
import { JumpNav } from './JumpNav'
import { ButtonPromptBar } from './ButtonPromptBar'
import { AboutScreen } from '../screens/AboutScreen'
import { SkillsScreen } from '../screens/SkillsScreen'
import { ProjectsScreen } from '../screens/ProjectsScreen'
import { ContactScreen } from '../screens/ContactScreen'

const SECTION_COMPONENTS: Record<SectionId, () => JSX.Element> = {
  about: AboutScreen,
  skills: SkillsScreen,
  projects: ProjectsScreen,
  contact: ContactScreen,
}

export function GameShell() {
  const { screen, soundEnabled, goTo, startGame, toggleSound } = useGameState()
  const reduce = useReducedMotion()
  const anim = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.02 } }

  const isSection = screen !== 'boot' && screen !== 'hub'
  const Section = isSection ? SECTION_COMPONENTS[screen as SectionId] : null

  return (
    <div data-testid="app-root" className="min-h-screen bg-ki-900 text-white">
      <AnimatePresence mode="wait">
        {screen === 'boot' && (
          <motion.div key="boot" {...anim}>
            <BootScreen onStart={startGame} />
          </motion.div>
        )}
        {screen === 'hub' && (
          <motion.div key="hub" {...anim}>
            <MainHub onSelect={(s) => goTo(s)} />
          </motion.div>
        )}
        {isSection && Section && (
          <motion.div key={screen} {...anim} className="flex min-h-screen flex-col">
            <div className="flex items-center justify-between">
              <JumpNav active={screen as SectionId} onJump={(s) => goTo(s)} onReturn={() => goTo('hub')} />
              <button onClick={toggleSound} className="mr-4 text-sm text-ki-200 underline">
                {soundEnabled ? 'Sound: On' : 'Sound: Off'}
              </button>
            </div>
            <div className="flex-1">
              <Section />
            </div>
            <ButtonPromptBar prompts={[{ key: 'A', label: 'Confirm' }, { key: 'B', label: 'Return' }]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 4: Wire into App** — replace `src/App.tsx`:

```tsx
import { GameShell } from './components/GameShell'

export default function App() {
  return <GameShell />
}
```

Update `src/App.test.tsx` to assert the boot button instead of just the root:
```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the boot screen first', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: /press start/i })).toBeInTheDocument()
})
```

- [ ] **Step 5: Run the full suite to verify it passes**

Run: `npm test`
Expected: PASS (all tasks' tests green).

- [ ] **Step 6: Manual smoke check**

Run: `npm run dev` and open the local URL. Verify: PRESS START → hub → each section → JumpNav switching → Return. Then `npm run build` succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: wire GameShell flow with transitions and reduced motion"
```

---

## Notes for the implementer

- Add a real avatar image at `public/avatar.png` when available; until then the `Avatar` fallback silhouette renders (this is expected, not a bug).
- The gamified visual polish (exact ki gradients, gold borders, glow, sfx files) is intentionally light in these tasks so tests stay behavior-focused. A dedicated styling/audio polish pass comes after the flow works end-to-end — do not block tasks on pixel-exact styling.
- Sound files and the wiring of `createSoundPlayer` into real `Audio` playback are a later phase (see spec "Richer audio"). `createSoundPlayer` is built and tested here so that wiring is a drop-in.
