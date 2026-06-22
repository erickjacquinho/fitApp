import { View, TextInputProps } from 'react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { COLORS } from '../../tokens/colors';
import { Search, X } from 'lucide-react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Input } from "@/components/ui/input";

export interface SearchBarProps extends TextInputProps {
  onClear?: () => void;
  containerClassName?: string;
}

export function SearchBar({ value, onClear, containerClassName, ...props }: SearchBarProps) {
  return (
    <View className={twMerge(clsx('relative flex-row items-center', containerClassName))}>
      <View className="absolute left-3 z-10" pointerEvents="none">
        <Icon as={Search} className="text-text-muted" />
      </View>
      <Input
        value={value}
        className="pl-10 pr-10"
        placeholderTextColor={COLORS.placeholder}
        {...props}
      />
      {value ? (
        <View className="absolute right-1 z-10">
          <Button
            accessibilityLabel="Limpar busca"
            variant="ghost"
            size="icon"
            onPress={onClear}
          >
            <Icon as={X} className="text-text-muted" />
          </Button>
        </View>
      ) : null}
    </View>
  );
}
