export { profile, profileNameBoot } from './profile'
export type {
  EducationEntry,
  ExperienceEntry,
  Profile,
  ProfileLinks,
  ProjectEntry,
  ProjectStatus,
  SkillEntry,
  TimelineEntry,
} from './types'

import { profile } from './profile'

export const timeline = profile.timeline
export const experience = profile.experience
export const projects = profile.projects
export const skills = profile.skills
export const links = profile.links
