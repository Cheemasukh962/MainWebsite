import type { Content } from './types'

export const content: Content = {
  about: {
    name: 'Zukai',
    role: 'Frontend Developer',
    bio: 'Building gamified web experiences. Replace this with your own bio.',
    avatar: '/avatar.png',
    profile: [
      { label: 'Role',     value: 'Frontend Developer' },
      { label: 'Location', value: 'TBD' },
      { label: 'Status',   value: 'Available' },
      { label: 'Pronouns', value: 'TBD' },
    ],
    loadout: [
      { label: 'Main Stack',     value: 'React + TypeScript' },
      { label: 'Styling',        value: 'Tailwind CSS' },
      { label: 'Editor',         value: 'VS Code' },
      { label: 'OS',             value: 'Windows 11' },
      { label: 'Current Quest',  value: 'Shipping this portfolio' },
      { label: 'Tool of Choice', value: 'Claude Code' },
    ],
    card: {
      level: '∞',
      stars: 5,
      tier: 'gold',
      badge: 'OG',
      seasonCode: 'S1 · T01',
    },
  },
  trainingLevel: 48,
  skills: [
    { name: 'React', rank: 'S', level: 90 },
    { name: 'TypeScript', rank: 'A', level: 80 },
    { name: 'CSS / Tailwind', rank: 'A', level: 78 },
    { name: 'Node.js', rank: 'B', level: 60 },
  ],
  stats: [
    { label: 'Frontend',   value: 90 },
    { label: 'TypeScript', value: 85 },
    { label: 'Styling',    value: 78 },
    { label: 'Backend',    value: 60 },
    { label: 'Design',     value: 55 },
    { label: 'Database',   value: 50 },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Project Alpha',
      description: 'Replace with a real project description.',
      tags: ['React', 'TypeScript'],
      links: [{ label: 'GitHub', url: 'https://github.com/' }],
    },
    {
      id: 'proj-2',
      title: 'Project Beta',
      description: 'Replace with a real project description.',
      tags: ['Next.js', 'Tailwind'],
      links: [{ label: 'GitHub', url: 'https://github.com/' }],
    },
    {
      id: 'proj-3',
      title: 'Project Gamma',
      description: 'Replace with a real project description.',
      tags: ['Node', 'API'],
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
