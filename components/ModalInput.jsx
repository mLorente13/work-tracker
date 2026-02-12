import { Text, TextInput, View } from "react-native";

export default function ModalInput({ label, value }) {
  return (
    <View className="flex-col gap-2 w-full">
      <Text className="text-sm text-gray-600">{label}</Text>
      <View className="w-full rounded-lg bg-gray-100 p-3">
        <TextInput value={value} />
      </View>
    </View>
  );
}
