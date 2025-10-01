/**
 * Generates realistic view counts for projects that increase over time
 * Uses a combination of random starting values and date-based progression
 */

interface ViewCounterConfig {
  baseViews: number;
  dailyGrowth: number;
  weeklyVariation: number;
  categoryMultiplier: number;
}

// Configuration for different project categories
const CONFIG: Record<string, ViewCounterConfig> = {
  project: {
    baseViews: 15,
    dailyGrowth: 0.8,
    weeklyVariation: 0.3,
    categoryMultiplier: 1.0
  },
  dashboard: {
    baseViews: 25,
    dailyGrowth: 1.2,
    weeklyVariation: 0.4,
    categoryMultiplier: 1.3
  }
};

/**
 * Generates a deterministic but pseudo-random number based on project ID and date
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Calculates the number of days since a project was "created"
 * Uses project ID to simulate different creation dates
 */
function getDaysSinceCreation(projectId: number): number {
  // Simulate projects created at different times
  // Project 1: 6 months ago, Project 2: 5 months ago, etc.
  const monthsAgo = Math.max(1, 7 - projectId);
  const daysAgo = monthsAgo * 30 + Math.floor(seededRandom(projectId) * 15);
  return daysAgo;
}

/**
 * Calculates the current view count for a project
 */
export function calculateViewCount(projectId: number, category: 'project' | 'dashboard'): number {
  const config = CONFIG[category];
  const daysSinceCreation = getDaysSinceCreation(projectId);
  
  // Generate a unique seed for this project
  const projectSeed = projectId * 1000 + category.length;
  
  // Base views with some randomness
  const randomFactor = 0.8 + seededRandom(projectSeed) * 0.4; // 0.8 to 1.2
  const baseViews = Math.floor(config.baseViews * randomFactor);
  
  // Calculate growth over time
  const totalGrowth = daysSinceCreation * config.dailyGrowth;
  
  // Add weekly variation (some weeks get more views)
  const weeksSinceCreation = Math.floor(daysSinceCreation / 7);
  const weeklyVariationFactor = 1 + (seededRandom(projectSeed + weeksSinceCreation) - 0.5) * config.weeklyVariation;
  
  // Apply category multiplier
  const categoryFactor = config.categoryMultiplier;
  
  // Calculate final view count
  const viewCount = Math.floor(
    (baseViews + totalGrowth) * weeklyVariationFactor * categoryFactor
  );
  
  // Ensure minimum views and add some current-day randomness
  const minViews = Math.floor(config.baseViews * 0.6);
  const currentDayRandomness = Math.floor(seededRandom(Date.now() + projectId) * 5);
  
  return Math.max(minViews, viewCount + currentDayRandomness);
}

/**
 * Updates all projects with new view counts
 */
export function updateProjectViewCounts(projects: any[]): any[] {
  return projects.map(project => ({
    ...project,
    metrics: {
      ...project.metrics,
      views: calculateViewCount(project.id, project.category)
    }
  }));
}

/**
 * Gets a realistic view count for display (formatted with commas)
 */
export function getFormattedViewCount(projectId: number, category: 'project' | 'dashboard'): string {
  const count = calculateViewCount(projectId, category);
  return count.toLocaleString();
}
