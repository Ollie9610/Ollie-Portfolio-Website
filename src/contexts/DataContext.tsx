import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, Project, Skill, Experience } from '../types';
import { dataService } from '../services/dataService';
import { migrationService } from '../services/migrationService';

interface DataContextType {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: number, experience: Partial<Experience>) => void;
  deleteExperience: (id: number) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Partial<Skill>) => void;
  deleteSkill: (index: number) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  exportData: () => void;
  importData: (data: any) => void;
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
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    location: '',
    email: '',
    profileImage: '',
    bio: '',
    roles: 'Data Analyst',
    linkedin: ''
  });
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    // Load data from localStorage first (from offline editor), then fallback to server
    const loadData = async () => {
      
      try {
        // Load Profile from localStorage
        const savedProfile = localStorage.getItem('portfolio_profile');
        if (savedProfile) {
          try {
            const profileData = JSON.parse(savedProfile);
            setProfile(profileData.profile || profileData);
          } catch (error) {
            console.error('❌ Error parsing profile from localStorage:', error);
            // Load from server as fallback
            const profileResult = await dataService.getProfileWithFallback();
            if (profileResult.success && profileResult.data) {
              const migratedData = migrationService.migrateData(profileResult.data);
              setProfile(migratedData.profile || migratedData);
            } else {
              const defaultData = migrationService.getDefaultData();
              setProfile(defaultData.profile);
            }
          }
        } else {
          // No localStorage data, load from server
          const profileResult = await dataService.getProfileWithFallback();
          if (profileResult.success && profileResult.data) {
            const migratedData = migrationService.migrateData(profileResult.data);
            setProfile(migratedData.profile || migratedData);
          } else {
            const defaultData = migrationService.getDefaultData();
            setProfile(defaultData.profile);
          }
        }

        // Load Projects from localStorage
        const savedProjects = localStorage.getItem('portfolio_projects');
        if (savedProjects) {
          try {
            const projectsData = JSON.parse(savedProjects);
            const projects = Array.isArray(projectsData.projects) ? projectsData.projects : [];
            const formattedProjects = projects.map((project: any) => ({
              ...project,
              category: project.category as 'project' | 'dashboard'
            }));
            setProjects(formattedProjects);
          } catch (error) {
            console.error('❌ Error parsing projects from localStorage:', error);
            // Load from server as fallback
            const projectsResult = await dataService.getProjectsWithFallback();
            if (projectsResult.success && projectsResult.data) {
              const projects = Array.isArray(projectsResult.data) ? projectsResult.data : (projectsResult.data as any).projects || [];
              const formattedProjects = projects.map((project: any) => ({
                ...project,
                category: project.category as 'project' | 'dashboard'
              }));
              setProjects(formattedProjects);
            } else {
              const defaultData = migrationService.getDefaultData();
              setProjects(defaultData.projects || []);
            }
          }
        } else {
          // No localStorage data, load from server
          const projectsResult = await dataService.getProjectsWithFallback();
          if (projectsResult.success && projectsResult.data) {
            const projects = Array.isArray(projectsResult.data) ? projectsResult.data : (projectsResult.data as any).projects || [];
            const formattedProjects = projects.map((project: any) => ({
              ...project,
              category: project.category as 'project' | 'dashboard'
            }));
            setProjects(formattedProjects);
          } else {
            const defaultData = migrationService.getDefaultData();
            setProjects(defaultData.projects || []);
          }
        }

        // Load Skills from localStorage
        const savedSkills = localStorage.getItem('portfolio_skills');
        
        if (savedSkills) {
          try {
            const skillsData = JSON.parse(savedSkills);
            const skills = Array.isArray(skillsData) ? skillsData : (Array.isArray(skillsData.skills) ? skillsData.skills : []);
            setSkills(skills);
          } catch (error) {
            console.error('❌ Error parsing skills from localStorage:', error);
            // Load from server as fallback
            const skillsResult = await dataService.getSkillsWithFallback();
            if (skillsResult.success && skillsResult.data) {
              const skills = Array.isArray(skillsResult.data) ? skillsResult.data : (skillsResult.data as any).skills || [];
              setSkills(skills);
            } else {
              setSkills([]);
            }
          }
        } else {
          // No localStorage data, load from server
          const skillsResult = await dataService.getSkillsWithFallback();
          if (skillsResult.success && skillsResult.data) {
            const skills = Array.isArray(skillsResult.data) ? skillsResult.data : (skillsResult.data as any).skills || [];
            setSkills(skills);
          } else {
            setSkills([]);
          }
        }

        // Load Experiences from localStorage
        const savedExperiences = localStorage.getItem('portfolio_experiences');
        if (savedExperiences) {
          try {
            const experiencesData = JSON.parse(savedExperiences);
            const experiences = Array.isArray(experiencesData.experiences) ? experiencesData.experiences : [];
            // Handle legacy format - convert duration to startDate/endDate if needed
            const updatedExperiences = experiences.map((exp: any) => {
              if (!exp.startDate && exp.duration) {
                const parts = exp.duration.split(' - ');
                if (parts.length === 2) {
                  const startYear = parts[0].trim();
                  const endPart = parts[1].trim();
                  return {
                    ...exp,
                    type: exp.type || 'job',
                    startDate: `${startYear}-01`,
                    endDate: endPart === 'Present' ? null : `${endPart}-12`,
                    location: exp.location || 'Unknown',
                    duration: exp.duration || `${startYear} - ${endPart}`
                  };
                }
              }
              return {
                ...exp,
                type: exp.type || 'job',
                startDate: exp.startDate || '2020-01',
                endDate: exp.endDate || null,
                location: exp.location || 'Unknown',
                duration: exp.duration || '2020 - Present'
              };
            });
            setExperiences(updatedExperiences);
          } catch (error) {
            console.error('❌ Error parsing experiences from localStorage:', error);
            // Load from server as fallback
            const experiencesResult = await dataService.getExperiencesWithFallback();
            if (experiencesResult.success && experiencesResult.data) {
              const experiences = Array.isArray(experiencesResult.data) ? experiencesResult.data : (experiencesResult.data as any).experiences || [];
              const updatedExperiences = experiences.map((exp: any) => {
                if (!exp.startDate && exp.duration) {
                  const parts = exp.duration.split(' - ');
                  if (parts.length === 2) {
                    const startYear = parts[0].trim();
                    const endPart = parts[1].trim();
                    return {
                      ...exp,
                      type: exp.type || 'job',
                      startDate: `${startYear}-01`,
                      endDate: endPart === 'Present' ? null : `${endPart}-12`,
                      location: exp.location || 'Unknown'
                    };
                  }
                }
                return {
                  ...exp,
                  type: exp.type || 'job',
                  startDate: exp.startDate || '2020-01',
                  endDate: exp.endDate || null,
                  location: exp.location || 'Unknown'
                };
              });
              setExperiences(updatedExperiences);
            } else {
              const defaultData = migrationService.getDefaultData();
              setExperiences(defaultData.experiences || []);
            }
          }
        } else {
          // No localStorage data, load from server
          const experiencesResult = await dataService.getExperiencesWithFallback();
          if (experiencesResult.success && experiencesResult.data) {
            const experiences = Array.isArray(experiencesResult.data) ? experiencesResult.data : (experiencesResult.data as any).experiences || [];
            const updatedExperiences = experiences.map((exp: any) => {
              if (!exp.startDate && exp.duration) {
                const parts = exp.duration.split(' - ');
                if (parts.length === 2) {
                  const startYear = parts[0].trim();
                  const endPart = parts[1].trim();
                  return {
                    ...exp,
                    type: exp.type || 'job',
                    startDate: `${startYear}-01`,
                    endDate: endPart === 'Present' ? null : `${endPart}-12`,
                    location: exp.location || 'Unknown',
                    duration: exp.duration || `${startYear} - ${endPart}`
                  };
                }
              }
              return {
                ...exp,
                type: exp.type || 'job',
                startDate: exp.startDate || '2020-01',
                endDate: exp.endDate || null,
                location: exp.location || 'Unknown',
                duration: exp.duration || '2020 - Present'
              };
            });
            setExperiences(updatedExperiences);
          } else {
            const defaultData = migrationService.getDefaultData();
            setExperiences(defaultData.experiences || []);
          }
        }

      } catch (error) {
        console.error('💥 Critical error loading data:', error);
        // Clear localStorage if there are persistent errors
        localStorage.removeItem('portfolio_profile');
        localStorage.removeItem('portfolio_projects');
        localStorage.removeItem('portfolio_skills');
        localStorage.removeItem('portfolio_experiences');
        // Reload with default data
        window.location.reload();
      }
    };
    loadData();
  }, []);

  // Listen for custom events from offline editor
  useEffect(() => {
    const handlePortfolioDataUpdate = (e: CustomEvent) => {
      // Reload data when offline editor saves changes
      window.location.reload();
    };

    window.addEventListener('portfolioDataUpdated', handlePortfolioDataUpdate as EventListener);
    
    return () => {
      window.removeEventListener('portfolioDataUpdated', handlePortfolioDataUpdate as EventListener);
    };
  }, []);

  const addProject = async (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now() };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    
    // Update localStorage
    localStorage.setItem('portfolio_projects', JSON.stringify({ projects: updatedProjects }));
    
    
    // Update server (fallback)
    await dataService.updateProjectsWithFallback(updatedProjects);
  };

  const updateProject = async (id: number, project: Partial<Project>) => {
    const updatedProjects = projects.map(p => p.id === id ? { ...p, ...project } : p);
    setProjects(updatedProjects);
    
    // Update localStorage
    localStorage.setItem('portfolio_projects', JSON.stringify({ projects: updatedProjects }));
    
    
    // Update server (fallback)
    await dataService.updateProjectsWithFallback(updatedProjects);
  };

  const deleteProject = async (id: number) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    
    // Update localStorage
    localStorage.setItem('portfolio_projects', JSON.stringify({ projects: updatedProjects }));
    
    // Update server
    await dataService.updateProjectsWithFallback(updatedProjects);
  };

  const addExperience = async (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: Date.now() };
    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    
    // Update JSON files directly
    try {
      const response = await fetch('/api/save-data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'experiences',
          data: updatedExperiences
        })
      });
      
      if (!response.ok) {
        console.warn('Failed to save experiences to server, data saved locally only');
        // Fallback to localStorage
        localStorage.setItem('portfolio_experiences', JSON.stringify({ experiences: updatedExperiences }));
      }
    } catch (error) {
      console.warn('Failed to save experiences to server, data saved locally only');
      // Fallback to localStorage
      localStorage.setItem('portfolio_experiences', JSON.stringify({ experiences: updatedExperiences }));
    }
  };

  const updateExperience = async (id: number, experience: Partial<Experience>) => {
    const updatedExperiences = experiences.map(e => e.id === id ? { ...e, ...experience } : e);
    setExperiences(updatedExperiences);
    
    // Update JSON files directly
    try {
      const response = await fetch('/api/save-data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'experiences',
          data: updatedExperiences
        })
      });
      
      if (!response.ok) {
        console.warn('Failed to save experiences to server, data saved locally only');
        // Fallback to localStorage
        localStorage.setItem('portfolio_experiences', JSON.stringify({ experiences: updatedExperiences }));
      }
    } catch (error) {
      console.warn('Failed to save experiences to server, data saved locally only');
      // Fallback to localStorage
      localStorage.setItem('portfolio_experiences', JSON.stringify({ experiences: updatedExperiences }));
    }
  };

  const deleteExperience = async (id: number) => {
    const updatedExperiences = experiences.filter(e => e.id !== id);
    setExperiences(updatedExperiences);
    
    // Update JSON files directly
    try {
      const response = await fetch('/api/save-data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'experiences',
          data: updatedExperiences
        })
      });
      
      if (!response.ok) {
        console.warn('Failed to save experiences to server, data saved locally only');
        // Fallback to localStorage
        localStorage.setItem('portfolio_experiences', JSON.stringify({ experiences: updatedExperiences }));
      }
    } catch (error) {
      console.warn('Failed to save experiences to server, data saved locally only');
      // Fallback to localStorage
      localStorage.setItem('portfolio_experiences', JSON.stringify({ experiences: updatedExperiences }));
    }
  };

  const addSkill = async (skill: Skill) => {
    const updatedSkills = [...skills, skill];
    setSkills(updatedSkills);
    
    // Update localStorage
    localStorage.setItem('portfolio_skills', JSON.stringify({ skills: updatedSkills }));
    
    // Update server (fallback)
    await dataService.updateSkillsWithFallback(updatedSkills);
  };

  const updateSkill = async (index: number, skill: Partial<Skill>) => {
    const updatedSkills = skills.map((s, i) => i === index ? { ...s, ...skill } : s);
    setSkills(updatedSkills);
    
    // Update localStorage
    localStorage.setItem('portfolio_skills', JSON.stringify({ skills: updatedSkills }));
    
    // Update server (fallback)
    await dataService.updateSkillsWithFallback(updatedSkills);
  };

  const deleteSkill = async (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    
    // Update localStorage
    localStorage.setItem('portfolio_skills', JSON.stringify({ skills: updatedSkills }));
    
    // Update server
    await dataService.updateSkillsWithFallback(updatedSkills);
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    const updatedProfile = { ...profile, ...profileData };
    setProfile(updatedProfile);
    
    // Update localStorage
    localStorage.setItem('portfolio_profile', JSON.stringify({ profile: updatedProfile }));
    
    // Update server (fallback)
    await dataService.updateProfileWithFallback(updatedProfile);
  };

  const exportData = () => {
    const data = {
      profile,
      projects,
      skills,
      experiences
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (data: any) => {
    if (data.profile) {
      setProfile(data.profile);
      localStorage.setItem('portfolio_profile', JSON.stringify({ profile: data.profile }));
    }
    if (data.projects) {
      setProjects(data.projects);
      localStorage.setItem('portfolio_projects', JSON.stringify({ projects: data.projects }));
    }
    if (data.skills) {
      setSkills(data.skills);
      localStorage.setItem('portfolio_skills', JSON.stringify({ skills: data.skills }));
    }
    if (data.experiences) {
      setExperiences(data.experiences);
      localStorage.setItem('portfolio_experiences', JSON.stringify({ experiences: data.experiences }));
    }
  };

  const resetToDefaults = () => {
    const defaultData = migrationService.getDefaultData();
    setProfile(defaultData.profile);
    setProjects(defaultData.projects || []);
    setSkills([]);
    setExperiences(defaultData.experiences || []);
    
    // Clear localStorage
    localStorage.removeItem('portfolio_profile');
    localStorage.removeItem('portfolio_projects');
    localStorage.removeItem('portfolio_skills');
    localStorage.removeItem('portfolio_experiences');
  };

  const value: DataContextType = {
    profile,
    projects,
    skills,
    experiences,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
    updateProfile,
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
