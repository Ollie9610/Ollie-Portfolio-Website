// Migration service to handle data structure changes
// This ensures admin data stays compatible when we add new features

interface Migration {
  version: string;
  description: string;
  migrate: (data: any) => any;
}

class MigrationService {
  private migrations: Migration[] = [
    {
      version: '1.0.0',
      description: 'Initial data structure',
      migrate: (data) => data // No changes needed
    },
    {
      version: '1.1.0',
      description: 'Add new profile fields',
      migrate: (data) => {
        if (data.profile) {
          return {
            ...data,
            profile: {
              ...data.profile,
              // Add new fields with defaults
              website: data.profile.website || '',
              github: data.profile.github || '',
              twitter: data.profile.twitter || '',
              // Ensure all required fields exist
              name: data.profile.name || 'Your Name',
              bio: data.profile.bio || 'Add your bio here',
              roles: data.profile.roles || 'Professional',
              location: data.profile.location || 'Your Location',
              email: data.profile.email || 'your.email@example.com',
              profileImage: data.profile.profileImage || '/api/placeholder/300/300',
              linkedin: data.profile.linkedin || ''
            }
          };
        }
        return data;
      }
    },
    {
      version: '1.2.0',
      description: 'Add certifications section',
      migrate: (data) => {
        return {
          ...data,
          // Add new section with empty array if it doesn't exist
          certifications: data.certifications || []
        };
      }
    },
    {
      version: '1.3.0',
      description: 'Add awards section',
      migrate: (data) => {
        return {
          ...data,
          awards: data.awards || []
        };
      }
    },
    {
      version: '1.4.0',
      description: 'Remove title field and update profile structure',
      migrate: (data) => {
        if (data.profile) {
          const { title, ...profileWithoutTitle } = data.profile;
          return {
            ...data,
            profile: {
              ...profileWithoutTitle,
              // Ensure all required fields exist with proper defaults
              name: data.profile.name || 'Your Name',
              location: data.profile.location || 'Your City, Country',
              email: data.profile.email || 'your.email@example.com',
              profileImage: data.profile.profileImage || '/api/placeholder/300/300',
              bio: data.profile.bio || 'Add your bio here',
              roles: data.profile.roles || 'Professional',
              linkedin: data.profile.linkedin || ''
            }
          };
        }
        return data;
      }
    }
  ];

  private getCurrentVersion(): string {
    return this.migrations[this.migrations.length - 1].version;
  }

  private getDataVersion(data: any): string {
    return data.version || '1.0.0';
  }

  // Migrate data to current version
  migrateData(data: any): any {
    const currentVersion = this.getCurrentVersion();
    const dataVersion = this.getDataVersion(data);
    
    if (dataVersion === currentVersion) {
      return data; // No migration needed
    }

    console.log(`Migrating data from ${dataVersion} to ${currentVersion}`);
    
    // Find migrations to apply
    const migrationsToApply = this.migrations.filter(
      migration => this.compareVersions(migration.version, dataVersion) > 0
    );

    // Apply migrations in order
    let migratedData = { ...data };
    for (const migration of migrationsToApply) {
      console.log(`Applying migration: ${migration.description}`);
      migratedData = migration.migrate(migratedData);
    }

    // Update version
    migratedData.version = currentVersion;
    migratedData.lastMigration = new Date().toISOString();

    return migratedData;
  }

  // Simple version comparison (1.2.0 > 1.1.0)
  private compareVersions(version1: string, version2: string): number {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;
      
      if (v1Part > v2Part) return 1;
      if (v1Part < v2Part) return -1;
    }
    
    return 0;
  }

  // Get default data structure for new installations
  getDefaultData() {
    return {
      version: this.getCurrentVersion(),
      profile: {
        name: 'Your Name',
        location: 'Your City, Country',
        email: 'your.email@example.com',
        profileImage: '/api/placeholder/300/300',
        bio: 'I transform raw data into strategic insights that drive business growth.',
        roles: 'Data Analyst\nBI Developer\nProcess Optimisation Expert',
        linkedin: 'https://linkedin.com/in/your-profile',
        website: '',
        github: '',
        twitter: ''
      },
      projects: [],
      experiences: [],
      skills: [],
      certifications: [],
      awards: []
    };
  }
}

export const migrationService = new MigrationService();


