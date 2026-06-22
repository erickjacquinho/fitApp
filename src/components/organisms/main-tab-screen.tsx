import { Text } from '@/components/ui/text';
import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '../molecules/Header';

interface MainTabScreenProps {
  title: string;
  children?: ReactNode;
  scrollable?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}

export function MainTabScreen({
  title,
  children,
  scrollable = true,
  headerLeft,
  headerRight,
}: MainTabScreenProps) {
  const Container = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? {
        className: "flex-1",
        contentContainerClassName: "px-screen-x py-compact gap-section-gap",
      }
    : {
        className: "flex-1 px-screen-x py-compact gap-section-gap",
      };

  return (
    <View className="flex-1 bg-surface-app">
      <Header title={title} headerLeft={headerLeft} headerRight={headerRight} />
      <Container keyboardShouldPersistTaps="handled" {...containerProps}>
        {children}
      </Container>
    </View>
  );
}
