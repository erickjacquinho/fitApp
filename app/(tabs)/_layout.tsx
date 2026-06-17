import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../src/components/atoms/Icon';
import { COLORS } from '../../src/components/atoms/colors';

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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.tabActive,
        tabBarInactiveTintColor: COLORS.iconMuted,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.surfaceRaised,
          borderTopColor: COLORS.borderSoft,
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingHorizontal: 8,
        },
        tabBarItemStyle: {
          minHeight: 44,
          borderRadius: 5,
          marginHorizontal: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0,
        },
      }}
    >
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Estatisticas',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="ChartLine" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Treino',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Dumbbell" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="House" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: 'Dieta',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Utensils" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="User" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
