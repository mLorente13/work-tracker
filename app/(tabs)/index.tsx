import { FlatList, Pressable, Text, View } from "react-native";

import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/hooks/use-color-scheme";
import { supabase } from "@/lib/supabase";
import { formatMinutesToHM, formatSecondsToHM } from "@/lib/time-utils";
import { RefreshCw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
        .from("workday")
        .select("*")
        .eq("user_id", session?.user.id);
      if (error) {
        console.error("Error fetching workdays:", error);
      } else {
        console.log(data);
        setWorkDays(data || []);
      }
      setRefreshing(false);
      console.log(refreshing);
    };
    getUserWorkDays();
  }, [session, refreshing]);

  return (
    <SafeAreaView
      className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <Text className="text-2xl font-bold text-center mt-6 mb-4">
        {t("home.title")}
      </Text>
      <FlatList
        data={workDays}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold">
              {t("home.date")}: {item.date}
            </Text>
            <Text>
              {t("home.workTime")}: {formatSecondsToHM(item.work_time)}
            </Text>
            <Text>
              {t("home.restTime")}: {formatMinutesToHM(item.rest_time)}
            </Text>
          </View>
        )}
      />
      <Pressable
        className="absolute bottom-4 right-4 bg-blue-500 rounded-full p-4"
        onPress={() => setRefreshing(true)}
      >
        <RefreshCw size={24} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
