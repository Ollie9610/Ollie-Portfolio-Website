export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'project' | 'dashboard';
  metrics: {
    views: number;
    impact: string;
    duration: string;
  };
  details: {
    challenge: string;
    solution: string;
    results: string;
    technologies: string[];
    features: string[];
  };
}

export interface Skill {
  name: string;
  level: number;
  category: 'Technical' | 'Analytical' | 'Tools' | 'Soft Skills';
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
  bio: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

