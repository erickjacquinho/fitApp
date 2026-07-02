export interface DietGoal {
  caloriesGoal: number;
  objective: 'loss' | 'gain' | 'maintenance';
}

export const DEFAULT_DIET_GOAL: DietGoal = {
  caloriesGoal: 2200,
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

export type DietComplianceStatus = 'success' | 'warning' | 'error';

/**
 * Categorizes the caloric compliance of a given intake against the target goal.
 * Rule (Proportional 10% margin):
 * - "warning" (Próximo): intake < goal * 0.9
 * - "error" (Desvio): intake > goal * 1.1
 * - "success" (Meta Batida): goal * 0.9 <= intake <= goal * 1.1
 */
export function getDietComplianceStatus(calories: number, goal: number): DietComplianceStatus {
  const lowerLimit = goal * 0.9;
  const upperLimit = goal * 1.1;

  if (calories < lowerLimit) {
    return 'warning';
  } else if (calories > upperLimit) {
    return 'error';
  } else {
    return 'success';
  }
}
