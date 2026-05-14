import { View, Pressable } from 'react-native';
import { Typography } from '../atoms/Typography';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SegmentedControlProps {
  tabs: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  className?: string;
}

export function SegmentedControl({ tabs, selectedIndex, onChange, className }: SegmentedControlProps) {
  return (
    <View className={twMerge(clsx('flex-row p-1 bg-gray-300 rounded-sm', className))}>
      {tabs.map((tab, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(index)}
            className={clsx(
              'flex-1 py-2 items-center justify-center',
              isSelected ? 'bg-white-pure border border-gray-400' : 'bg-transparent'
            )}
          >
            <Typography
              variant="label"
              color={isSelected ? 'default' : 'muted'}
            >
              {tab}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
