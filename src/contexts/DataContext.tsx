import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types';
import { dataService } from '../services/dataService';
import { migrationService } from '../services/migrationService';

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
  exportData: () => void;
  importData: (file: File) => Promise<boolean>;
  resetToDefaults: () => void;
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
    // Load data from server files with localStorage fallback
    const loadData = async () => {
      try {
        // Load profile data
        const profileResult = await dataService.getProfileWithFallback();
        if (profileResult.success && profileResult.data) {
          // Migrate data to current version
          const migratedData = migrationService.migrateData(profileResult.data);
          setProfile(migratedData.profile || migratedData);
        } else {
          // Fallback to default data
          const defaultData = migrationService.getDefaultData();
          setProfile(defaultData.profile);
        }

        // Load projects data
        const projectsResult = await dataService.getProjectsWithFallback();
        if (projectsResult.success && projectsResult.data) {
          const projects = Array.isArray(projectsResult.data) 
            ? projectsResult.data 
            : projectsResult.data.projects || [];
          const formattedProjects = projects.map((project: any) => ({
            ...project,
            category: project.category as 'project' | 'dashboard'
          }));
          setProjects(formattedProjects);
        } else {
          // Fallback to default data
          const defaultData = migrationService.getDefaultData();
          setProjects(defaultData.projects || []);
        }

        // Load experiences data
        const experiencesResult = await dataService.getExperiencesWithFallback();
        if (experiencesResult.success && experiencesResult.data) {
          const experiences = Array.isArray(experiencesResult.data) 
            ? experiencesResult.data 
            : experiencesResult.data.experiences || [];
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
          // Fallback to default data
          const defaultData = migrationService.getDefaultData();
          setExperiences(defaultData.experiences || []);
        }

        // Load skills data
        const skillsResult = await dataService.getSkillsWithFallback();
        if (skillsResult.success && skillsResult.data) {
          const skills = Array.isArray(skillsResult.data) 
            ? skillsResult.data 
            : skillsResult.data.skills || [];
          setSkills(skills);
        } else {
          // Fallback to default data
          const defaultData = migrationService.getDefaultData();
          setSkills(defaultData.skills || []);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const updateProjects = async (newProjects: Project[]) => {
    setProjects(newProjects);
    // Update both server and localStorage
    await dataService.updateProjectsWithFallback(newProjects);
  };

  const updateExperiences = async (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    // Update both server and localStorage
    await dataService.updateExperiencesWithFallback(newExperiences);
  };

  const updateSkills = async (newSkills: Skill[]) => {
    setSkills(newSkills);
    // Update both server and localStorage
    await dataService.updateSkillsWithFallback(newSkills);
  };

  const updateProfile = async (newProfile: Partial<Profile>) => {
    const updatedProfile = { ...profile, ...newProfile };
    setProfile(updatedProfile);
    // Update both server and localStorage
    await dataService.updateProfileWithFallback(updatedProfile);
  };

  const addProject = async (project: Project) => {
    const newProjects = [...projects, { ...project, id: Math.max(...projects.map(p => p.id), 0) + 1 }];
    await updateProjects(newProjects);
  };

  const updateProject = async (id: number, project: Project) => {
    const newProjects = projects.map(p => p.id === id ? { ...project, id } : p);
    await updateProjects(newProjects);
  };

  const deleteProject = async (id: number) => {
    const newProjects = projects.filter(p => p.id !== id);
    await updateProjects(newProjects);
  };

  const addExperience = async (experience: Omit<Experience, 'id'>) => {
    const newExperiences = [...experiences, { ...experience, id: Math.max(...experiences.map(e => e.id), 0) + 1 }];
    await updateExperiences(newExperiences);
  };

  const updateExperience = async (id: number, experience: Omit<Experience, 'id'>) => {
    const newExperiences = experiences.map(e => e.id === id ? { ...experience, id } : e);
    await updateExperiences(newExperiences);
  };

  const deleteExperience = async (id: number) => {
    const newExperiences = experiences.filter(e => e.id !== id);
    await updateExperiences(newExperiences);
  };

  const addSkill = async (skill: Skill) => {
    const newSkills = [...skills, skill];
    await updateSkills(newSkills);
  };

  const updateSkill = async (name: string, skill: Skill) => {
    const newSkills = skills.map(s => s.name === name ? skill : s);
    await updateSkills(newSkills);
  };

  const deleteSkill = async (name: string) => {
    const newSkills = skills.filter(s => s.name !== name);
    await updateSkills(newSkills);
  };

  // Export all data as JSON
  const exportData = () => {
    const allData = {
      profile,
      projects,
      experiences,
      skills,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import data from JSON file
  const importData = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          // Validate data structure
          if (data.profile && data.projects && data.experiences && data.skills) {
            setProfile(data.profile);
            setProjects(data.projects);
            setExperiences(data.experiences);
            setSkills(data.skills);
            
            // Update localStorage
            localStorage.setItem('portfolio_profile', JSON.stringify(data.profile));
            localStorage.setItem('portfolio_projects', JSON.stringify(data.projects));
            localStorage.setItem('portfolio_experiences', JSON.stringify(data.experiences));
            localStorage.setItem('portfolio_skills', JSON.stringify(data.skills));
            
            resolve(true);
          } else {
            reject(new Error('Invalid data format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  };

  // Reset to default data
  const resetToDefaults = () => {
    localStorage.removeItem('portfolio_profile');
    localStorage.removeItem('portfolio_projects');
    localStorage.removeItem('portfolio_experiences');
    localStorage.removeItem('portfolio_skills');
    window.location.reload();
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
    deleteSkill,
    exportData,
    importData,
    resetToDefaults
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
