import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types';

interface Experience {
  id: number;
  type: 'job' | 'education';
  title: string;
  company: string;
  startDate: string; // YYYY-MM format
  endDate: string | null; // YYYY-MM format, null for current/ongoing
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface Skill {
  name: string;
  level: number;
  category: 'Programming & Query Languages' | 'Analytics & Data Platforms' | 'Application Development & Automation' | 'Business Systems';
}

interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
  bio: string;
  greeting: string;
  roles: string;
  linkedin: string;
}

interface DataContextType {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  profile: Profile;
  updateProjects: (projects: Project[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  addProject: (project: Project) => void;
  updateProject: (id: number, project: Project) => void;
  deleteProject: (id: number) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: number, experience: Omit<Experience, 'id'>) => void;
  deleteExperience: (id: number) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (name: string, skill: Skill) => void;
  deleteSkill: (name: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    location: '',
    email: '',
    phone: '',
    profileImage: '',
    bio: '',
    greeting: '',
    roles: '',
    linkedin: ''
  });

  useEffect(() => {
    // Load data from localStorage or use default data
    const loadData = () => {
      try {
        const savedProjects = localStorage.getItem('portfolio_projects');
        const savedExperiences = localStorage.getItem('portfolio_experiences');
        const savedSkills = localStorage.getItem('portfolio_skills');
        const savedProfile = localStorage.getItem('portfolio_profile');

        if (savedProjects) {
          const projects = JSON.parse(savedProjects).map((project: any) => ({
            ...project,
            category: project.category as 'project' | 'dashboard'
          }));
          setProjects(projects);
        } else {
          // Load default data
          import('../data/projects.json').then(data => {
            const projects = data.projects.map(project => ({
              ...project,
              category: project.category as 'project' | 'dashboard'
            }));
            setProjects(projects);
            localStorage.setItem('portfolio_projects', JSON.stringify(projects));
          });
        }

        if (savedExperiences) {
          const experiences = JSON.parse(savedExperiences);
          // Handle legacy format - convert duration to startDate/endDate if needed
          const updatedExperiences = experiences.map((exp: any) => {
            if (!exp.startDate && exp.duration) {
              // Parse legacy duration format like "2022 - Present" or "2020 - 2022"
              const parts = exp.duration.split(' - ');
              if (parts.length === 2) {
                const startYear = parts[0].trim();
                const endPart = parts[1].trim();
                return {
                  ...exp,
                  type: exp.type || 'job',
                  startDate: `${startYear}-01`,
                  endDate: endPart === 'Present' ? null : `${endPart}-12`
                };
              }
            }
            return {
              ...exp,
              type: exp.type || 'job'
            };
          });
          setExperiences(updatedExperiences);
        } else {
          import('../data/experiences.json').then(data => {
            const experiences = data.experiences.map((exp: any) => ({
              ...exp,
              type: exp.type as 'job' | 'education'
            }));
            setExperiences(experiences);
            localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
          });
        }

        if (savedSkills) {
          setSkills(JSON.parse(savedSkills));
        } else {
          import('../data/skills.json').then(data => {
            setSkills(data.skills as Skill[]);
            localStorage.setItem('portfolio_skills', JSON.stringify(data.skills));
          });
        }

        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        } else {
          import('../data/profile.json').then(data => {
            setProfile(data.profile);
            localStorage.setItem('portfolio_profile', JSON.stringify(data.profile));
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
  };

  const updateExperiences = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    localStorage.setItem('portfolio_experiences', JSON.stringify(newExperiences));
  };

  const updateSkills = (newSkills: Skill[]) => {
    setSkills(newSkills);
    localStorage.setItem('portfolio_skills', JSON.stringify(newSkills));
  };

  const updateProfile = (newProfile: Partial<Profile>) => {
    const updatedProfile = { ...profile, ...newProfile };
    setProfile(updatedProfile);
    localStorage.setItem('portfolio_profile', JSON.stringify(updatedProfile));
  };

  const addProject = (project: Project) => {
    const newProjects = [...projects, { ...project, id: Math.max(...projects.map(p => p.id), 0) + 1 }];
    updateProjects(newProjects);
  };

  const updateProject = (id: number, project: Project) => {
    const newProjects = projects.map(p => p.id === id ? { ...project, id } : p);
    updateProjects(newProjects);
  };

  const deleteProject = (id: number) => {
    const newProjects = projects.filter(p => p.id !== id);
    updateProjects(newProjects);
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperiences = [...experiences, { ...experience, id: Math.max(...experiences.map(e => e.id), 0) + 1 }];
    updateExperiences(newExperiences);
  };

  const updateExperience = (id: number, experience: Omit<Experience, 'id'>) => {
    const newExperiences = experiences.map(e => e.id === id ? { ...experience, id } : e);
    updateExperiences(newExperiences);
  };

  const deleteExperience = (id: number) => {
    const newExperiences = experiences.filter(e => e.id !== id);
    updateExperiences(newExperiences);
  };

  const addSkill = (skill: Skill) => {
    const newSkills = [...skills, skill];
    updateSkills(newSkills);
  };

  const updateSkill = (name: string, skill: Skill) => {
    const newSkills = skills.map(s => s.name === name ? skill : s);
    updateSkills(newSkills);
  };

  const deleteSkill = (name: string) => {
    const newSkills = skills.filter(s => s.name !== name);
    updateSkills(newSkills);
  };

  const value = {
    projects,
    experiences,
    skills,
    profile,
    updateProjects,
    updateExperiences,
    updateSkills,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
