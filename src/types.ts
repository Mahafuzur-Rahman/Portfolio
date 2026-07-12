export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  result?: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: { name: string; percentage: number }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  bulletPoints?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  aboutMe: string;
  avatarUrl: string;
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  languages: Language[];
  softSkills: string[];
  contact: ContactInfo;
}

export interface MessageRecord {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

