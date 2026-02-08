import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  themePreference: ThemePreference;
  colorScheme: ResolvedTheme;
  setThemePreference: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function resolveColorScheme(
  preference: ThemePreference,
  system: "light" | "dark" | null | undefined,
): ResolvedTheme {
  if (preference === "system") {
    return system === "dark" ? "dark" : "light";
  }
  return preference;
}

export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const systemColorScheme = useSystemColorScheme();
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("theme").then((stored) => {
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemePreference(stored);
      }
      setIsLoaded(true);
    });
  }, []);

  function handleSetThemePreference(theme: ThemePreference) {
    setThemePreference(theme);
    AsyncStorage.setItem("theme", theme);
  }

  const colorScheme = resolveColorScheme(themePreference, systemColorScheme);

  const value = useMemo(
    () => ({
      themePreference,
      colorScheme,
      setThemePreference: handleSetThemePreference,
    }),
    [themePreference, colorScheme],
  );

  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
