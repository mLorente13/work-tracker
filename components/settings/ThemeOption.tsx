import { Sun } from "lucide-react-native";
import { Pressable, Text } from "react-native";

export default function ThemeOption({
  current,
  setCurrent,
  label,
  icon,
}: {
  current?: boolean;
  label: string;
  icon?: React.ReactNode;
}) {
  const backgroundColor = current ? "bg-blue-500" : "bg-transparent";
  const borderColor = current
    ? "border-blue-500"
    : "border-gray-300 dark:border-gray-600";
  const textColor = current ? "text-white" : "text-gray-700 dark:text-gray-300";
  console.log("Current theme:", label, current);
  return (
    <Pressable
      onPress={setCurrent}
      className={`flex-1 flex-col gap-2 items-center p-3 rounded-lg border ${borderColor} ${backgroundColor} ${textColor}`}
    >
      {icon ? icon : <Sun size={24} />}
      <Text className="font-semibold">{label}</Text>
    </Pressable>
  );
}
