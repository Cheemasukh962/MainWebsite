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
