import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '@/components/ui/skeleton';

export function MenuScreenSkeleton() {
  return (
    <View className="absolute inset-0 bg-background z-10 pt-4 px-screen-x">
      <View className="mb-6 overflow-hidden border border-border-subtle rounded-lg bg-surface flex-row items-center justify-between py-4 px-card">
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-1 items-center">
            <Skeleton className="size-24 rounded-full" />
          </View>
          <View className="flex-1 items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-10" />
          </View>
          <View className="flex-1 items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-10" />
          </View>
          <View className="flex-1 items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-10" />
          </View>
        </View>
      </View>
      
      <View className="gap-0">
        {[1, 2, 3].map((i) => (
          <View key={i} className="mb-6 overflow-hidden border border-border-subtle rounded-lg bg-surface flex-col">
            <View className="px-4 h-control-md bg-surface flex-row justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-12" />
            </View>
            <View className="h-1 w-full flex-row overflow-hidden bg-border-subtle">
              <Skeleton className="h-1 w-full" />
            </View>
            <View className="flex-col">
              <View className="gap-0">
                <Skeleton className="h-food-card w-full rounded-none border-b border-border-subtle" />
                <Skeleton className="h-food-card w-full rounded-none border-b border-border-subtle" />
              </View>
              <View className="px-4 h-control-md flex-row justify-between items-center bg-surface border-b border-border-subtle">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </View>
              <View className="h-control-md flex-row items-center justify-center w-full">
                <Skeleton className="h-4 w-40" />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
