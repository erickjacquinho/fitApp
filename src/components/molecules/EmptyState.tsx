import React from 'react';
import { View } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { LucideIcon } from 'lucide-react-native';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  buttonText,
  onButtonPress,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-10 px-6 gap-2">
      <View className="items-center justify-center h-16 w-16 rounded-full bg-soft mb-2">
        <Icon size={32} color="#6F6254" />
      </View>
      <Typography variant="title" className="text-center">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="text" color="muted" className="text-center mt-1">
          {subtitle}
        </Typography>
      )}
      {buttonText && onButtonPress && (
        <View className="mt-6 w-full max-w-[200px]">
          <Button variant="outline" title={buttonText} onPress={onButtonPress} />
        </View>
      )}
    </View>
  );
}
