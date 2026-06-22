import { Text } from '@/components/ui/text';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

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
            <Button
              accessibilityLabel="Voltar"
              variant="ghost"
              size="icon"
              onPress={() => router.back()}
              className="-ml-1"
            >
              <Icon as={ArrowLeft} size={24} />
            </Button>
          ) : null}
        </View>

        <View className="flex-2 items-center">
          <Text variant="label" className="text-center">
            {title}
          </Text>
        </View>

        <View className="flex-1 items-end justify-center">
          {headerRight}
        </View>
      </View>
    </View>
  );
}
