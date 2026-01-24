import { Tabs } from "expo-router";
import React from "react";

import { FabTabButton } from "@/components/FabTabButton";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Cog, Plus } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const isLoggedIn = !!session;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Protected guard={isLoggedIn}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="workday"
          options={{
            title: "Jornada",
            tabBarButton: FabTabButton,
            tabBarIcon: () => <Plus size={28} color={"white"} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Ajustes",
            tabBarIcon: ({ color }) => <Cog size={28} color={color} />,
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
