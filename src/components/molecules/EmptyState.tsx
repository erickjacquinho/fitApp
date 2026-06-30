import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { LucideIcon } from 'lucide-react-native';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export function EmptyState({
  icon: IconComponent,
  title,
  subtitle,
  buttonText,
  onButtonPress,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-10 px-6 gap-2">
      <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-surface-sunken">
        <Icon as={IconComponent} size={32} className="text-text-secondary" />
      </View>
      <Text variant="title" className="text-center">
        {title}
      </Text>
      {subtitle && (
        <Text variant="text" className="mt-1 text-center text-text-secondary">
          {subtitle}
        </Text>
      )}
      {buttonText && onButtonPress && (
        <View className="mt-6 w-full">
          <Button variant="outline" onPress={onButtonPress}><Text>{buttonText}</Text></Button>
        </View>
      )}
    </View>
  );
}
