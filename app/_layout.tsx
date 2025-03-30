import { AppHeader } from "@/components/AppHeader";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";

import "react-native-reanimated";
import { AccountService } from "@/services/account";
import { TransactionHistoryService } from "@/services/transaction-history";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const safeAreaContainerStyle = useMemo(() => {
    return colorScheme === "light"
      ? styles.safeAreaContainerLight
      : styles.safeAreaContainerDark;
  }, [colorScheme]);

  // Initial database tables setup
  const setupDatabaseTables = useCallback(async () => {
    const accountService = await AccountService.getInstance();
    const transactionHistoryService =
      await TransactionHistoryService.getInstance();

    await accountService.initAccounts();
    await transactionHistoryService.initTransctionHistoryTable();
  }, []);

  useEffect(() => {
    setupDatabaseTables();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <SafeAreaView style={safeAreaContainerStyle}>
          <View style={styles.viewContainer}>
            <AppHeader />
          </View>
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainerLight: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  safeAreaContainerDark: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  viewContainer: {
    padding: Layout.page.padding,
  },
});
