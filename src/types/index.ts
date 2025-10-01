export interface Project {
  id: number;
  title: string;
  briefDescription: string;
  description: string;
  technologies: string[];
  category: 'project' | 'dashboard';
  keyResults: string;
}

export interface Skill {
  name: string;
  dots: number; // 1, 2, or 3 dots
  category: 'Programming & Query Languages' | 'Analytics & Data Platforms' | 'Application Development & Automation' | 'Business Systems';
}

export interface Profile {
  name: string;
  title?: string;
  location: string;
  email: string;
  phone?: string;
  profileImage: string;
  bio: string;
  greeting?: string;
  roles: string;
  linkedin: string;
  website?: string;
  github?: string;
  twitter?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  startDate: string;
  endDate: string | null;
  location: string;
  type: 'job' | 'education';
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

