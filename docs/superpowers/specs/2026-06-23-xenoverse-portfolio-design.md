# Xenoverse Portfolio — Design Spec

**Date:** 2026-06-23
**Status:** Approved (design), pending spec review
**Author:** Zukai (cheemasukh966@gmail.com)

## Summary

A personal portfolio website styled as a heavily gamified Dragon Ball
Xenoverse menu system. The experience itself is the point: visitors boot into
the site like a game, navigate a main hub, and explore four content sections,
each modeled on a distinct in-game Xenoverse screen.

This is "Approach B" — themed screens per section (no shared visual shell),
the most creative and most build-heavy of the options considered.

## Goals

- Memorable, creativity-showcasing experience over raw speed-to-info.
- Faithful Xenoverse "feel": ki-blue gradient panels, gold scroll borders,
  glowing selected rows, button-prompt bar, sound effects, ki-flash transitions.
- Maintainable: all personal content lives in one typed data file; layout is
  separate from data.
- The avatar is a swappable component so a 2D image can be upgraded to a real
  3D rotating model later without rearchitecting.

## Non-Goals (YAGNI)

- No backend, CMS, database, or auth. Static SPA.
- No 3D model in v1 (2D avatar only; 3D is a future upgrade path).
- No blog, analytics dashboard, or contact form submission backend (contact is
  links only).
- No multi-language support.

## Tech Stack

- Build: Vite
- Framework: React + TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Sound: small HTML5 audio helper (mutable)
- Hosting target: any static host (e.g. Netlify / Vercel / GitHub Pages) — TBD,
  not required for the build.

## User Flow

1. **Boot intro** (`BootScreen`)
   - Black screen → "PRESS START" prompt.
   - On start: ki-charge animation (glow builds + charge sfx) → swoosh
     transition into the Main Hub.
   - A **Skip** button is always visible and jumps straight to the hub.
   - Decision: boot plays **every visit** (the experience is the point). A
     "skip after first visit" behavior is intentionally deferred but must be
     implementable as a single toggle (persist a `bootSeen` flag in
     `localStorage`; gate the boot on it). Not wired up in v1.

2. **Main Hub** (`MainHub`)
   - Styled like the Xenoverse top menu.
   - Four glowing options: About Me / Skills / Projects / Contact.
   - Selecting an option triggers a ki-flash transition into that screen.

3. **Inside any screen**
   - A small persistent **jump-nav** (`JumpNav`, Xenoverse tab styling) allows
     hopping between the four sections without returning to the hub.
   - A `Ⓑ Return` control returns to the Main Hub.
   - A persistent `ButtonPromptBar` shows context actions
     (e.g. `Ⓐ Confirm  Ⓑ Return`).

## The Four Themed Screens

Each screen is modeled on a specific Xenoverse screenshot provided by the user.

| Section            | Modeled on                | Treatment                                                                                                                                       |
|--------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **About Me**       | Customize / Preset card   | Bio in the central stat-card; 2D `Avatar` stands in the right panel with idle float + ki glow.                                                   |
| **Skills**         | Play Data / Training       | Skills as circular "character" tiles with S/A/B ranks; a "Total Training Level" bar that fills to "SUPER"; `COMPLETE` stamps.                    |
| **Projects**       | Item Select / capsule      | Each project is a capsule item in a list; selecting it shows details (description, tech tags, links) in the right info panel.                     |
| **Contact / Exp.** | Character Select roster    | A roster grid of "fighters" = contact links (GitHub, LinkedIn, email) + optional experience entries; hover reveals a move-list-style popover.    |

## Gamified Flourishes

- Ki-flash / swoosh transitions between screens (Framer Motion).
- Hover/select sound effects, with a toggleable mute button. Respects browser
  autoplay rules (no sound before first user interaction; muted by default on
  mobile).
- XP/Level bar + `COMPLETE` stamps on the Skills screen.
- Glowing selected-row highlight, gold scroll borders, ki-blue gradient panels.
- Bottom button-prompt bar with contextual prompts.

## Architecture & Component Boundaries

- `GameShell` — owns global UI state and renders transitions.
  - State: `currentScreen` (`'boot' | 'hub' | 'about' | 'skills' | 'projects'
    | 'contact'`), `soundEnabled: boolean`, `bootDone: boolean`.
  - Responsibility: route between screens, orchestrate transition animations.
  - Depends on: Framer Motion, the screen components, sound helper.
- `BootScreen` — the PRESS START + ki-charge intro. Emits a "start" event.
- `MainHub` — the four-option top menu. Emits a "select section" event.
- `JumpNav` — persistent in-screen section switcher.
- `ButtonPromptBar` — contextual button-prompt strip.
- `AboutScreen` / `SkillsScreen` / `ProjectsScreen` / `ContactScreen` — one per
  section; each reads from `content.ts`, renders its themed layout.
- `Avatar` — isolated avatar component. v1 renders a 2D image with CSS/Framer
  idle motion. Interface designed so a 3D (react-three-fiber) implementation can
  be swapped in behind the same props without changing consumers.
- `content.ts` — single typed source of truth for all personal content:
  bio, skills (name + rank + level), projects (title, description, tags, links),
  contact links, optional experience entries. Layout components never hardcode
  content.

### Data Flow

`content.ts` (static typed data) → screen components (read-only) → presentational
sub-components. `GameShell` holds only UI/navigation state, not content. No
external data fetching.

## Responsive Behavior

- Desktop-first; the multi-panel game look is the primary target.
- Mobile: three-panel layouts stack vertically; the avatar shrinks to a banner.
- Sound is off by default on mobile.

## Error Handling

- Missing/broken avatar image → fallback silhouette + ki glow (no broken-image
  icon).
- Audio blocked by browser autoplay policy → fail silent, keep mute toggle in
  the "off" visual state until user enables.
- Reduced motion: respect `prefers-reduced-motion` — disable ki-flash/charge
  animations, fall back to instant/cross-fade transitions; boot collapses to a
  simple "PRESS START" → hub.

## Testing Strategy

- Component tests (Vitest + React Testing Library):
  - `GameShell` navigation: selecting a hub option sets the right
    `currentScreen`; `JumpNav` switches sections; `Return` goes to hub.
  - `BootScreen` Skip emits start; PRESS START emits start.
  - Each screen renders the data from a mock `content.ts` (correct skills,
    projects, links appear).
  - `Avatar` renders fallback when image fails to load.
  - Sound helper respects the `soundEnabled` flag (no playback when muted).
- `prefers-reduced-motion` path renders without animation components.

## Future Upgrade Paths (out of scope for v1)

v1 is "a good start" — a polished static front end. The following are explicitly
planned for later phases and should not block or complicate v1, but the
architecture should leave room for them:

- **Backend** — a proper backend (e.g. contact form submission, dynamic content,
  view counters / "XP" persistence, an admin way to edit `content.ts` data).
  v1 keeps all content in a typed static file precisely so it can later be fed
  from an API behind the same component interfaces.
- **Richer audio** — expanded sound design (per-screen BGM, more SFX, volume
  control beyond a single mute toggle). v1 ships a minimal mutable SFX helper
  whose interface can grow.
- 2D avatar → 3D rotating model (react-three-fiber) via the `Avatar` interface.
- "Skip boot after first visit" via `localStorage` `bootSeen` flag.
- Promote a section to a full standalone themed route if desired.
