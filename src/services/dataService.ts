// File-based data service for admin content
// This service handles reading from and writing to server files

export interface DataServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class DataService {
  // For static hosting, we'll use localStorage as primary storage
  // and fall back to default data if needed

  // Generic fetch method for loading JSON files
  private async fetchData<T>(endpoint: string, options?: RequestInit): Promise<DataServiceResponse<T>> {
    try {
      const response = await fetch(`/data${endpoint}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: `Failed to load ${endpoint}: ${error}` 
      };
    }
  }

  // Read data from server files
  async getProfile() {
    return this.fetchData('/profile');
  }

  async getProjects() {
    return this.fetchData('/projects');
  }

  async getExperiences() {
    return this.fetchData('/experiences');
  }

  async getSkills() {
    return this.fetchData('/skills');
  }

  // Write data to server files
  async updateProfile(profile: any) {
    return this.fetchData('/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async updateProjects(projects: any[]) {
    return this.fetchData('/projects', {
      method: 'POST',
      body: JSON.stringify({ projects }),
    });
  }

  async updateExperiences(experiences: any[]) {
    return this.fetchData('/experiences', {
      method: 'POST',
      body: JSON.stringify({ experiences }),
    });
  }

  async updateSkills(skills: any[]) {
    return this.fetchData('/skills', {
      method: 'POST',
      body: JSON.stringify({ skills }),
    });
  }

  // Fallback to localStorage if server is not available
  private getLocalStorageData(key: string) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private setLocalStorageData(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  // Hybrid approach: try server first, fallback to localStorage
  async getProfileWithFallback() {
    const serverResult = await this.getProfile();
    if (serverResult.success) {
      return serverResult;
    }
    
    // Fallback to localStorage
    const localData = this.getLocalStorageData('portfolio_profile');
    if (localData) {
      return { success: true, data: localData };
    }
    
    return { success: false, error: 'No data available' };
  }

  async getProjectsWithFallback() {
    const serverResult = await this.getProjects();
    if (serverResult.success) {
      return serverResult;
    }
    
    const localData = this.getLocalStorageData('portfolio_projects');
    if (localData) {
      return { success: true, data: localData };
    }
    
    return { success: false, error: 'No data available' };
  }

  async getExperiencesWithFallback() {
    const serverResult = await this.getExperiences();
    if (serverResult.success) {
      return serverResult;
    }
    
    const localData = this.getLocalStorageData('portfolio_experiences');
    if (localData) {
      return { success: true, data: localData };
    }
    
    return { success: false, error: 'No data available' };
  }

  async getSkillsWithFallback() {
    const serverResult = await this.getSkills();
    if (serverResult.success) {
      return serverResult;
    }
    
    const localData = this.getLocalStorageData('portfolio_skills');
    if (localData) {
      return { success: true, data: localData };
    }
    
    return { success: false, error: 'No data available' };
  }

  // Update with both server and localStorage
  async updateProfileWithFallback(profile: any) {
    const serverResult = await this.updateProfile(profile);
    this.setLocalStorageData('portfolio_profile', profile);
    return serverResult;
  }

  async updateProjectsWithFallback(projects: any[]) {
    const serverResult = await this.updateProjects(projects);
    this.setLocalStorageData('portfolio_projects', projects);
    return serverResult;
  }

  async updateExperiencesWithFallback(experiences: any[]) {
    const serverResult = await this.updateExperiences(experiences);
    this.setLocalStorageData('portfolio_experiences', experiences);
    return serverResult;
  }

  async updateSkillsWithFallback(skills: any[]) {
    const serverResult = await this.updateSkills(skills);
    this.setLocalStorageData('portfolio_skills', skills);
    return serverResult;
  }
}

export const dataService = new DataService();
