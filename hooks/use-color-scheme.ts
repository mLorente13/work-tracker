import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<string | null>(null);
  useEffect(() => {
    AsyncStorage.getItem("theme").then((storedTheme) => {
      setTheme(storedTheme);
    });
  }, [theme]);

  if (theme === null) return null;
  return theme === "system" ? colorScheme : theme;
};
