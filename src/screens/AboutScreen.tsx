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
