import { Monitor, Moon, Sun } from "lucide-react-native";
import { View } from "react-native";
import ThemeOption from "./ThemeOption";

export default function ThemeSelector({
  currentTheme,
  updateTheme,
}: {
  currentTheme?: "light" | "dark" | "system";
  updateTheme: (theme: "light" | "dark" | "system") => void;
}) {
  return (
    <View className="w-full flex-col gap-2 pb-4 border-b border-gray-300 dark:border-gray-600">
      <View className="flex-row justify-between gap-2">
        <ThemeOption
          icon={<Sun className="text-yellow-500 mb-2" size={20} />}
          label="Claro"
          current={currentTheme === "light"}
          setCurrent={() => updateTheme("light")}
        />
        <ThemeOption
          icon={<Moon className="text-yellow-500 mb-2" size={20} />}
          label="Oscuro"
          current={currentTheme === "dark"}
          setCurrent={() => updateTheme("dark")}
        />
        <ThemeOption
          icon={<Monitor className="text-yellow-500 mb-2" size={20} />}
          label="Sistema"
          current={currentTheme === "system"}
          setCurrent={() => updateTheme("system")}
        />
      </View>
    </View>
  );
}
