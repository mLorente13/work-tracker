import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WorkDayProvider } from "./context/WorkDayContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { session, loading } = useAuth();

  const isLoggedIn = !!session;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Stack>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                contentStyle: { flex: 1, height: "100%" },
              }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
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
      )}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <WorkDayProvider>
        <RootLayoutNav />
      </WorkDayProvider>
    </AuthProvider>
  );
}
