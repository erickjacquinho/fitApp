export interface DietGoal {
  caloriesGoal: number;
  toleranceMargin: number;
  objective: 'loss' | 'gain' | 'maintenance';
}

export const DEFAULT_DIET_GOAL: DietGoal = {
  caloriesGoal: 2200,
  toleranceMargin: 100,
  objective: 'maintenance',
};

/**
 * Returns the current diet goal configurations.
 * In the future, this will fetch dynamic settings from WatermelonDB settings table
 * or global Zustand store. Currently, it returns the mocked default goals.
 */
export function getDietGoal(): DietGoal {
  return DEFAULT_DIET_GOAL;
}
