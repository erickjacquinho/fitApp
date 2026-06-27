import React from 'react';
import { Text } from './text';

export interface PluralTextProps extends React.ComponentProps<typeof Text> {
  count: number;
  singular: string;
  plural: string;
  zero?: string;
  hideCount?: boolean;
}

export function PluralText({ count, singular, plural, zero, hideCount = false, ...textProps }: PluralTextProps) {
  let text = '';
  if (count === 0 && zero !== undefined) {
    text = zero;
  } else {
    const word = count === 1 ? singular : plural;
    text = hideCount ? word : `${count} ${word}`;
  }

  return <Text {...textProps}>{text}</Text>;
}
