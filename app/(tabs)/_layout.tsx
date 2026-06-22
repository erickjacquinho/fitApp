import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/icon';
import { COLORS } from '../../src/tokens/colors';
import { ChartLine, Dumbbell, House, Utensils, User, type LucideIcon } from 'lucide-react-native';
import { Platform } from 'react-native';
import { SIZES } from '@/tokens/sizes';
import { SPACING } from '@/tokens/spacing';
import { ROUNDED } from '@/tokens/rounded';
import { BORDER_WIDTH } from '@/tokens/border';
import { FONT_SIZE } from '@/tokens/typography';
import { FONT_WEIGHT } from '@/tokens/font-weight';

const { Navigator } = createMaterialTopTabNavigator();
const SwipeTabs = withLayoutContext(Navigator);

type TabIconProps = {
  color: string;
  focused: boolean;
  icon: LucideIcon;
};

function TabIcon({ color, focused, icon }: TabIconProps) {
  return <Icon as={icon} color={color} size={focused ? SIZES.iconLarge : SIZES.iconMedium} />;
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = SIZES.tabBar + Math.max(insets.bottom, SPACING.small);

  return (
    <SwipeTabs
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        tabBarActiveTintColor: COLORS.tabActive,
        tabBarInactiveTintColor: COLORS.iconMuted,
        tabBarShowLabel: true,
        tabBarIndicatorStyle: { height: 0 }, // Esconde a linha indicadora
        tabBarStyle: {
          backgroundColor: COLORS.surfaceRaised,
          borderTopColor: COLORS.borderSoft,
          borderTopWidth: BORDER_WIDTH.small,
          height: tabBarHeight,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : SPACING.small,
          justifyContent: 'center',
          elevation: 0, // Android shadow
          shadowOpacity: 0, // iOS shadow
        },
        tabBarItemStyle: {
          minHeight: SIZES.touchTarget,
          borderRadius: ROUNDED.small,
          marginHorizontal: SPACING.xsmall,
          padding: 0,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZE.default,
          fontWeight: FONT_WEIGHT.xlarge,
          letterSpacing: 0,
          textTransform: 'none', // Previne letras maiúsculas automáticas
          marginTop: SPACING.xsmall,
        },
      }}
    >
      <SwipeTabs.Screen
        name="diet"
        options={{
          title: 'Dieta',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon icon={Utensils} color={color} focused={focused} />
          ),
        }}
      />
      <SwipeTabs.Screen
        name="training"
        options={{
          title: 'Treino',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon icon={Dumbbell} color={color} focused={focused} />
          ),
        }}
      />
      <SwipeTabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon icon={House} color={color} focused={focused} />
          ),
        }}
      />
      <SwipeTabs.Screen
        name="statistics"
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon icon={ChartLine} color={color} focused={focused} />
          ),
        }}
      />
      <SwipeTabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon icon={User} color={color} focused={focused} />
          ),
        }}
      />
    </SwipeTabs>
  );
}
