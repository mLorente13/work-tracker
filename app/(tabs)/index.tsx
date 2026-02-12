import { FlatList, Pressable } from "react-native";

import { useAuth } from "@/app/context/AuthContext";
import Header from "@/components/Header";
import WorkdayCard from "@/components/WorkdayCard";
import { useTheme } from "@/hooks/use-color-scheme";
import { supabase } from "@/lib/supabase";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RefreshCw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { session } = useAuth();
  const [workDays, setWorkDays] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (!refreshing) return;
    const getUserWorkDays = async () => {
      const { data, error } = await supabase
        .from("workdays")
        .select("*")
        .eq("user_id", session?.user.id);
      if (error) {
        console.error("Error fetching workdays:", error);
      } else {
        setWorkDays(data || []);
      }
      setRefreshing(false);
    };
    getUserWorkDays();
  }, [session, refreshing]);

  return (
    <SafeAreaView
      className={`relative flex-1 ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Header
            title={t("home.title")}
            subtitle={t("home.subtitle", { count: workDays.length })}
          />
          <FlatList
            data={workDays}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <WorkdayCard workDay={item} />}
          />
          <Pressable
            className="absolute bottom-4 right-4 bg-blue-500 rounded-full p-4"
            onPress={() => setRefreshing(true)}
          >
            <RefreshCw size={24} color="white" />
          </Pressable>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
