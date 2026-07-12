import React, { useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';

interface DashboardScreenProps {
  metrics: any;
  isLoading: boolean;
  refetch: () => void;
}

export function DashboardScreen({ metrics, isLoading, refetch }: DashboardScreenProps) {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isLoading && !metrics) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  });

  return (
    <View className="flex-1" />
  );
}
