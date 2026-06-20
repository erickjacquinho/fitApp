import { ReactNode } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../atoms/colors';

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}

export function Header({ title, showBackButton, headerLeft, headerRight }: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={{ paddingTop: insets.top }}
      className="bg-surface-app border-b border-soft px-screen-x py-compact"
    >
      <View className="flex-row items-center justify-between min-h-control-md">
        <View className="flex-1 items-start justify-center">
          {headerLeft ? headerLeft : showBackButton ? (
            <Pressable 
              onPress={() => router.back()}
              className="w-11 h-11 items-center justify-center -ml-1"
            >
              <Icon name="ArrowLeft" size={24} color={COLORS.textMain} />
            </Pressable>
          ) : null}
        </View>

        <View className="flex-2 items-center">
          <Typography variant="label" className="text-center">
            {title}
          </Typography>
        </View>

        <View className="flex-1 items-end justify-center">
          {headerRight}
        </View>
      </View>
    </View>
  );
}
