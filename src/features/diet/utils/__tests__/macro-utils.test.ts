import { MACRO_METADATA } from '../macro-utils';

describe('Macro Utils Metadata', () => {
  it('maps macros to correct semantic tokens without raw colors', () => {
    expect(MACRO_METADATA.protein.token).toBe('protein');
    expect(MACRO_METADATA.carbs.token).toBe('carbohydrate');
    expect(MACRO_METADATA.fat.token).toBe('fat');
    expect(MACRO_METADATA.calories.token).toBe('primary');
    
    // Ensure no raw colors are used
    expect(MACRO_METADATA.protein.token).not.toContain('#');
    expect(MACRO_METADATA.carbs.token).not.toContain('#');
    expect(MACRO_METADATA.fat.token).not.toContain('#');
  });

  it('maps macros to correct readable labels', () => {
    expect(MACRO_METADATA.protein.label).toBe('Proteínas');
    expect(MACRO_METADATA.carbs.label).toBe('Carboidratos');
    expect(MACRO_METADATA.fat.label).toBe('Gorduras');
    expect(MACRO_METADATA.calories.label).toBe('Calorias');
  });
});
