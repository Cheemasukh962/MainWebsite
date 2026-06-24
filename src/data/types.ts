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
