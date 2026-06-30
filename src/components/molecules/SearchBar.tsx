import { View, TextInputProps } from 'react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
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
        <Icon as={Search} className="text-text-secondary" />
      </View>
      <Input
        value={value}
        className="px-10"
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
            <Icon as={X} className="text-text-secondary" />
          </Button>
        </View>
      ) : null}
    </View>
  );
}
