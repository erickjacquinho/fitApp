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
      <View className="absolute left-3 z-10" pointerEvents="none" accessibilityElementsHidden={true} importantForAccessibility="no">
        <Icon as={Search} size={20} className="text-text-secondary" />
      </View>
      <Input
        value={value}
        className="px-10"
        {...props}
      />
      {value ? (
        <View className="absolute right-1 z-10">
          <Button
            accessibilityRole="button"
            accessibilityLabel="Limpar busca"
            variant="ghost"
            size="icon"
            onPress={onClear}
            className="min-h-[44px] min-w-[44px] items-center justify-center active:opacity-80"
          >
            <Icon as={X} size={20} className="text-text-secondary" />
          </Button>
        </View>
      ) : null}
    </View>
  );
}
