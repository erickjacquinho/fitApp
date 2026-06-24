import { Text } from '@/components/ui/text';
import { ReactNode } from 'react';
import { ScrollView, View, FlatList, FlatListProps } from 'react-native';
import { Header } from '../molecules/Header';

interface MainTabScreenProps<T = any> {
  title?: string;
  customTitle?: ReactNode;
  children?: ReactNode;
  scrollable?: boolean;
  disablePadding?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  isFlatList?: boolean;
  flatListProps?: FlatListProps<T>;
}

export function MainTabScreen<T = any>({
  title,
  customTitle,
  children,
  scrollable = true,
  disablePadding = false,
  headerLeft,
  headerRight,
  isFlatList = false,
  flatListProps,
}: MainTabScreenProps<T>) {
  const Container = scrollable && !isFlatList ? ScrollView : View;
  
  // Padding for standard ScrollView screens
  const scrollPadding = disablePadding ? "" : "px-screen-x py-compact gap-section-gap";
  // Padding for static wrapper (scrollable=false) - removing vertical padding prevents clipping
  const staticPadding = disablePadding ? "" : "px-screen-x";
  
  const containerProps = scrollable && !isFlatList
    ? {
        className: "flex-1",
        contentContainerClassName: scrollPadding,
      }
    : {
        className: `flex-1 ${staticPadding}`,
      };

  return (
    <View className="flex-1 bg-background">
      <Header title={title} customTitle={customTitle} headerLeft={headerLeft} headerRight={headerRight} />
      
      {isFlatList && flatListProps ? (
        <View className="flex-1 relative">
          <FlatList
            className="flex-1"
            contentContainerClassName={`pb-content-bottom pt-4 px-screen-x ${flatListProps?.contentContainerClassName || ''}`}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            {...flatListProps}
          />
          {children}
        </View>
      ) : (
        <Container keyboardShouldPersistTaps="handled" {...containerProps}>
          {children}
        </Container>
      )}
    </View>
  );
}
