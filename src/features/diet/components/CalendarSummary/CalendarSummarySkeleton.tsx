import React from 'react';
import { View } from 'react-native';

export const CalendarSummarySkeleton = () => (
  <View className="flex-1 gap-content-gap py-compact animate-pulse px-4">
    {/* Heatmap skeleton */}
    <View className="bg-surface-elevated border border-border-subtle rounded-xl p-4 h-44 w-full" />
    
    {/* Month group skeleton */}
    <View className="h-6 w-32 bg-surface-elevated rounded-md mt-2" />
    
    {/* Card skeletons */}
    <View className="bg-surface-elevated border border-border-subtle rounded-xl p-4 h-24 w-full" />
    <View className="bg-surface-elevated border border-border-subtle rounded-xl p-4 h-24 w-full" />
  </View>
);
