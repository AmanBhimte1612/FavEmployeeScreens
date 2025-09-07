import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF0000', // Red for active
        tabBarInactiveTintColor: 'gray',  // Gray for inactive
        tabBarStyle: Platform.select({
          ios: { position: 'absolute', backgroundColor: 'white' },
          default: { backgroundColor: 'white' },
        }),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="users" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
