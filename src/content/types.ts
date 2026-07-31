export type ProjectStatus = 'live' | 'wip' | 'archived'

export interface ProfileLinks {
  email: string
  github: string
  linkedin: string
  location: string
  phone?: string
  website?: string
}

export interface TimelineEntry {
  yr: string
  title: string
  text: string
  featured?: boolean
  award?: string
}

export interface ProjectEntry {
  id: string
  name: string
  tags: string[]
  desc: string
  technical?: string
  status: ProjectStatus
  url?: string
  repo?: string
  featured?: boolean
  award?: string
}

export interface SkillEntry {
  id: string
  name: string
  links: string[]
}

export interface LanguageEntry {
  name: string
  level: string
}

export interface Profile {
  name: string
  siteName: string
  headline: string
  role: string
  bio: string
  contactMessage: string
  metaDescription: string
  links: ProfileLinks
  languages: LanguageEntry[]
  timeline: TimelineEntry[]
  projects: ProjectEntry[]
  skills: SkillEntry[]
}
