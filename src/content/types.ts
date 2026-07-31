export type ProjectStatus = 'live' | 'wip' | 'archived'

export interface ProfileLinks {
  email: string
  github: string
  linkedin: string
  location: string
  website?: string
}

export interface EducationEntry {
  school: string
  degree: string
  when: string
  text?: string
}

export interface TimelineEntry {
  yr: string
  title: string
  text: string
}

export interface ExperienceEntry {
  role: string
  org: string
  when: string
  text: string
}

export interface ProjectEntry {
  id: string
  name: string
  tags: string[]
  desc: string
  status: ProjectStatus
  url?: string
  repo?: string
}

export interface SkillEntry {
  id: string
  name: string
  lvl: 1 | 2 | 3 | 4 | 5
  links: string[]
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
  education: EducationEntry[]
  timeline: TimelineEntry[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  skills: SkillEntry[]
}
