import React from "react";
import { Text, View } from "react-native";

interface SettingsRowProps {
  icon?: React.ReactNode;
  label: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function SettingsRow({
  icon,
  label,
  subtitle,
  children,
}: SettingsRowProps) {
  return (
    <View className="w-full flex-col items-center justify-between py-4 first:pt-0 last:pb-0">
      {/* Left side: label */}
      <View className="w-full flex-row items-center gap-3">
        {icon && <View className="text-neutral-400">{icon}</View>}
        <View className="flex-col w-full">
          <Text className="text-xl font-semibold text-gray-800">{label}</Text>
          {subtitle && (
            <Text className="text-md text-neutral-500">{subtitle}</Text>
          )}
        </View>
      </View>

      {/* Right side: control */}
      <View className="w-full">{children}</View>
    </View>
  );
}
