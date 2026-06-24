import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display',
        'text-title',
        'text-subtitle',
        'text-text',
        'text-highlight',
        'text-label',
        'text-caption',
      ],
      'text-color': [
        {
          text: [
            'text-primary',
            'text-secondary',
            'text-secondary-surface',
            'text-secondary-background',
            'text-disabled',
            'text-inverse',
            'primary',
            'protein',
            'carbohydrate',
            'fat',
            'info',
            'warning',
            'success',
            'error',
            'link',
            'link-visited',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
