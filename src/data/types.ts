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
export interface Stat { label: string; value: number }
export interface InfoRow { label: string; value: string }

export type CardTier = 'ruby' | 'emerald' | 'sapphire' | 'gold' | 'diamond'

export interface AboutCard {
  level: string
  stars: number
  tier: CardTier
  badge?: string
  seasonCode?: string
}

export interface AboutInfo {
  name: string
  role: string
  bio: string
  avatar: string
  profile: InfoRow[]
  loadout: InfoRow[]
  card: AboutCard
}

export interface Content {
  about: AboutInfo
  trainingLevel: number
  skills: Skill[]
  stats: Stat[]
  projects: Project[]
  contacts: ContactLink[]
  experience: ExperienceEntry[]
}
