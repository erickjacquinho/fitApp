import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { Typography } from '../atoms/Typography';

interface MainTabScreenProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function MainTabScreen({
  eyebrow,
  title,
  description,
  children,
}: MainTabScreenProps) {
  return (
    <ScrollView
      className="flex-1 bg-surface-app"
      contentContainerClassName="px-screen-x py-screen-y-comfortable gap-section-gap"
    >
      <View className="gap-3">
        <Typography variant="label" color="muted">
          {eyebrow}
        </Typography>
        <Typography variant="title">
          {title}
        </Typography>
        <Typography variant="text" color="muted">
          {description}
        </Typography>
      </View>

      {children}
    </ScrollView>
  );
}
