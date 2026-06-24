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
