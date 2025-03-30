import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Text } from "react-native-ui-lib";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text text90 color={focused ? Colors.brand : color}>
              Transfer
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="send"
              size={24}
              color={focused ? Colors.brand : color}
            />
          ),
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text text90 color={focused ? Colors.brand : color}>
              History
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="history"
              size={24}
              color={focused ? Colors.brand : color}
            />
          ),
          animation: "shift",
        }}
      />
    </Tabs>
  );
}
