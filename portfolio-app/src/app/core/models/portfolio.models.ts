export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  openToWork: boolean;
}

export interface SkillGroup {
  partNumber: string;
  category: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  employmentType: string;
  period: string;
  duration: string;
  location: string;
  highlights: string[];
  isCurrent: boolean;
}

export interface EducationItem {
  credential: string;
  institution: string;
  period: string;
}

export interface ProjectItem {
  name: string;
  subtitle: string;
  description: string;
  stack: string[];
}

export interface Strength {
  label: string;
}

export interface LanguageSkill {
  name: string;
  level: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  strengths: Strength[];
  languages: LanguageSkill[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
