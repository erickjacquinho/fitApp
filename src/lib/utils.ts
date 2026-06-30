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

export function capitalizeWords(str: string): string {
  if (!str) return str;
  return str
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
