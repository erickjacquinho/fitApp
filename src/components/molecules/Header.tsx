import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function Header({ title, showBackButton }: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={{ paddingTop: insets.top }}
      className="bg-surface-app border-b border-soft px-screen-x py-compact"
    >
      <View className="flex-row items-center justify-between min-h-control-md">
        <View className="flex-1">
          {showBackButton && (
            <Pressable 
              onPress={() => router.back()}
              className="w-touch-target h-touch-target items-center justify-center -ml-micro"
            >
              <Icon name="ArrowLeft" size={24} color="var(--color-black-main)" />
            </Pressable>
          )}
        </View>

        <View className="flex-2 items-center">
          <Typography variant="label" className="text-center">
            {title}
          </Typography>
        </View>

        <View className="flex-1 items-end" />
      </View>
    </View>
  );
}
