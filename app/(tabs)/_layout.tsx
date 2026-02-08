import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/lib/constants/theme";
import { Clock, Settings } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function TabLayout() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { session } = useAuth();
  const isLoggedIn = !!session;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Protected guard={isLoggedIn}>
        <Tabs.Screen
          name="index"
          options={{
            title: t("tabs.home"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="workday"
          options={{
            title: t("tabs.workday"),
            tabBarIcon: ({ color }) => <Clock size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t("tabs.settings"),
            tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
