import "@/lib/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { WorkDayProvider } from "./context/WorkDayContext";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutNav() {
  const { colorScheme } = useThemeContext();
  const { session, loading } = useAuth();

  const isLoggedIn = !!session;

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  return (
    <NavigationThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              contentStyle: { flex: 1, height: "100%" },
            }}
          />
        </Stack.Protected>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            contentStyle: { flex: 1, height: "100%" },
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
            contentStyle: { flex: 1, height: "100%" },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkDayProvider>
          <RootLayoutNav />
        </WorkDayProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
