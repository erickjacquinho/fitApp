import React, { useState } from 'react';
import { View, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ExpandableBlockProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  initialExpanded?: boolean;
}

export function ExpandableBlock({
  title,
  subtitle,
  children,
  initialExpanded = true,
}: ExpandableBlockProps) {
  const [expanded, setExpanded] = useState(initialExpanded);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View className="mb-3 overflow-hidden rounded-md border border-soft bg-component-card-bg">
      <Pressable
        onPress={toggleExpand}
        className="flex-row items-center justify-between p-4 active:bg-white-soft"
      >
        <View className="flex-1 pr-4">
          <Typography variant="subtitle">{title}</Typography>
          {subtitle && (
            <Typography variant="caption" color="muted" className="mt-1">
              {subtitle}
            </Typography>
          )}
        </View>
        <View className="h-6 w-6 items-center justify-center rounded-full bg-surface-app">
          {expanded ? (
            <ChevronUp size={16} color="#666" />
          ) : (
            <ChevronDown size={16} color="#666" />
          )}
        </View>
      </Pressable>

      {expanded && (
        <View className="border-t border-soft p-4">
          {children}
        </View>
      )}
    </View>
  );
}
