import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Header } from '../molecules/Header';

interface MainTabScreenProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  scrollable?: boolean;
}

export function MainTabScreen({
  eyebrow,
  title,
  description,
  children,
  scrollable = true,
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
      <Header title={title} />
      <Container {...containerProps}>
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
      </Container>
    </View>
  );
}
