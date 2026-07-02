import React from 'react';
import { View, Pressable } from 'react-native';
import { Star, StarOff, Plus, Trash2 } from 'lucide-react-native';
import Animated, { 
  FadeInDown,
  FadeOutDown
} from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';

export interface BulkSelectionMenuProps {
  selectedCount: number;
  onFavorite: () => void;
  onUnfavorite: () => void;
  isAllFavorites: boolean;
  onAdd: () => void;
  onDelete: () => void;
}

export function BulkSelectionMenu({
  selectedCount,
  onFavorite,
  onUnfavorite,
  isAllFavorites,
  onAdd,
  onDelete
}: BulkSelectionMenuProps) {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  if (selectedCount === 0) return null;

  return (
    <Animated.View 
      entering={FadeInDown.springify().damping(22).mass(0.8).stiffness(150)}
      exiting={FadeOutDown}
      className="absolute bottom-6 left-0 right-0 items-center justify-center pointer-events-box-none"
    >
      <View 
        className="flex-row items-center bg-surface-elevated rounded-full px-2 h-14 border border-border-subtle overflow-hidden pointer-events-auto"
      >
        {/* Count Badge */}
        <View className="px-3 border-r border-border-subtle items-center justify-center">
          <Text className="text-primary font-bold text-base">{selectedCount}</Text>
        </View>

        {/* Actions */}
        <Pressable 
          onPress={isAllFavorites ? onUnfavorite : onFavorite}
          className="px-4 h-full items-center justify-center active:bg-border-subtle/50"
          hitSlop={10}
        >
          {isAllFavorites ? (
            <StarOff size={24} color={colors.textPrimary} />
          ) : (
            <Star size={24} color={colors.textPrimary} />
          )}
        </Pressable>
        
        <View className="w-px h-8 bg-border-subtle" />

        <Pressable 
          onPress={onAdd}
          className="px-4 h-full items-center justify-center active:bg-border-subtle/50"
          hitSlop={10}
        >
          <Plus size={24} color={colors.textPrimary} />
        </Pressable>

        <View className="w-px h-8 bg-border-subtle" />

        <Pressable 
          onPress={onDelete}
          className="px-4 h-full items-center justify-center active:bg-destructive/10"
          hitSlop={10}
        >
          <Trash2 size={24} color={colors.error} />
        </Pressable>
      </View>
    </Animated.View>
  );
}
