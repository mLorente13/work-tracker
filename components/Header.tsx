import { useTheme } from "@/hooks/use-color-scheme";
import { Text, View } from "react-native";

export default function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const theme = useTheme();
  return (
    <View className={"flex-col gap-2 border-b border-border px-4 pb-4 mb-4"}>
      <Text
        className={`text-3xl font-bold ${theme === "dark" ? "text-foreground" : "text-black"}`}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          className={`text-lg ${theme === "dark" ? "text-muted-foreground" : "text-muted"}`}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
