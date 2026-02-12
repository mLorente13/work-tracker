import { Text, View } from "react-native";

export default function StatusBadge({ status }: { status: string }) {
  return (
    <View className={`px-4 py-1 rounded-full bg-red-500/20`}>
      <Text className="text-md text-accent capitalize">
        {status === "in-progress"
          ? "working"
          : status === "on-break"
            ? "resting"
            : "completed"}
      </Text>
    </View>
  );
}
