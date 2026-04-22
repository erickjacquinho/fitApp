import { View, TextInputProps } from 'react-native';
import { Input } from '../atoms/Input';
import { Icon } from '../atoms/Icon';
import { IconButton } from './IconButton';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SearchBarProps extends TextInputProps {
  onClear?: () => void;
  containerClassName?: string;
}

export function SearchBar({ value, onClear, containerClassName, ...props }: SearchBarProps) {
  return (
    <View className={twMerge(clsx('relative flex-row items-center', containerClassName))}>
      <View className="absolute left-3 z-10 pointer-events-none">
        <Icon name="Search" size={20} color="#6B6B6B" />
      </View>
      <Input
        value={value}
        className="pl-10 pr-10"
        placeholderTextColor="#A0A0A0"
        {...props}
      />
      {value ? (
        <View className="absolute right-1 z-10">
          <IconButton icon="X" size={20} iconColor="#6B6B6B" onPress={onClear} />
        </View>
      ) : null}
    </View>
  );
}
