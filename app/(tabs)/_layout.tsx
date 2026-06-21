import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../src/components/atoms/Icon';
import { COLORS } from '../../src/tokens/colors';
import { Platform } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();
const SwipeTabs = withLayoutContext(Navigator);

type TabIconProps = {
  color: string;
  focused: boolean;
  name: 'ChartLine' | 'Dumbbell' | 'House' | 'Utensils' | 'User';
};

function TabIcon({ color, focused, name }: TabIconProps) {
  return <Icon name={name} color={color} size={focused ? 22 : 20} />;
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = 64 + Math.max(insets.bottom, 8);

  return (
    <SwipeTabs
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        tabBarActiveTintColor: COLORS.tabActive || '#000',
        tabBarInactiveTintColor: COLORS.iconMuted || '#ccc',
        tabBarShowLabel: true,
        tabBarIndicatorStyle: { height: 0 }, // Esconde a linha indicadora
        tabBarStyle: {
          backgroundColor: COLORS.surfaceRaised || '#fff',
          borderTopColor: COLORS.borderSoft || '#eee',
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
          justifyContent: 'center',
          elevation: 0, // Android shadow
          shadowOpacity: 0, // iOS shadow
        },
        tabBarItemStyle: {
          minHeight: 44,
          borderRadius: 5,
          marginHorizontal: 2,
          padding: 0,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0,
          textTransform: 'none', // Previne letras maiúsculas automáticas
          marginTop: 4,
        },
      }}
    >
      <SwipeTabs.Screen
        name="diet"
        options={{
          title: 'Dieta',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Utensils" color={color} focused={focused} />
          ),
        }}
      />
      <SwipeTabs.Screen
        name="training"
        options={{
          title: 'Treino',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Dumbbell" color={color} focused={focused} />
          ),
        }}
      />
      <SwipeTabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="House" color={color} focused={focused} />
          ),
        }}
      />
      <SwipeTabs.Screen
        name="statistics"
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="ChartLine" color={color} focused={focused} />
          ),
        }}
      />
      <SwipeTabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="User" color={color} focused={focused} />
          ),
        }}
      />
    </SwipeTabs>
  );
}
