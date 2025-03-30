import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Platform } from "react-native";
import { Text } from "react-native-ui-lib";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const getTabIconColor = useCallback(
    (focused: boolean, color: string) => {
      if (colorScheme === "light") {
        return focused ? Colors.primary.brand.light : color;
      }

      return focused ? Colors.primary.brand.dark : color;
    },
    [colorScheme]
  );

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
            <Text text90 color={getTabIconColor(focused, color)}>
              Transfer
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="send"
              size={24}
              color={getTabIconColor(focused, color)}
            />
          ),
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text text90 color={getTabIconColor(focused, color)}>
              History
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="history"
              size={24}
              color={getTabIconColor(focused, color)}
            />
          ),
          animation: "shift",
        }}
      />
    </Tabs>
  );
}
