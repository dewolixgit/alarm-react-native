import { MaterialIcons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import * as React from 'react';

import { COLORS } from '../styles/colors';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.darkBronze2,
        },
        headerTintColor: COLORS.beige1,
        headerTitleStyle: {
          fontFamily: 'NunitoSemibold',
        },
        tabBarActiveBackgroundColor: COLORS.darkBronze2,
        tabBarInactiveBackgroundColor: COLORS.darkBronze2,
        tabBarActiveTintColor: COLORS.beige3,
        tabBarStyle: {
          borderTopColor: COLORS.beige1,
          elevation: 5,
          backgroundColor: COLORS.darkBronze2,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="schedule/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="ring/index"
        options={{
          title: 'Будильник',
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="alarms/index"
        options={{
          title: ' Будильники ',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="access-alarm"
              size={24}
              color={focused ? COLORS.beige1 : 'gray'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="disabledAlarms/index"
        options={{
          title: 'Пробуждения',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="alarm-on"
              size={24}
              color={focused ? COLORS.beige1 : 'gray'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="auth/index"
        options={{
          title: 'Учётная запись',
          href: null,
        }}
      />
    </Tabs>
  );
};

export default Layout;
