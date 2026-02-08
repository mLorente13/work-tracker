import React from "react";
import { Text, View } from "react-native";

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({
  icon,
  title,
  children,
}: SettingsSectionProps) {
  return (
    <View className="flex-col gap-4 w-full">
      {/* Section header */}
      <View className="flex-row items-end gap-2">
        <Text className="text-blue-400">{icon}</Text>
        <Text className="w-full text-lg font-bold tracking-widest text-black uppercase">
          {title}
        </Text>
      </View>

      {/* Section card */}
      <View className="rounded-lg border border-[oklch(0.25 0 0)] p-4">
        <View className="w-full">{children}</View>
      </View>
    </View>
  );
}
