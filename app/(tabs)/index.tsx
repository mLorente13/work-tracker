import { FlatList, Pressable, Text } from "react-native";

import { useAuth } from "@/app/context/AuthContext";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { supabase } from "@/lib/supabase";
import { formatMinutesToHM, formatSecondsToHM } from "@/lib/time-utils";
import { RefreshCw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
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
    <SafeAreaView className="flex-1">
      <Text className="text-2xl font-bold text-center mt-6 mb-4">
        Tus jornadas de trabajo
      </Text>
      <FlatList
        data={workDays}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView className="p-4 border-b border-gray-200">
            <ThemedText className="text-lg font-semibold">
              Date: {item.date}
            </ThemedText>
            <ThemedText>
              Tiempo de trabajo: {formatSecondsToHM(item.work_time)}
            </ThemedText>
            <ThemedText>
              Descanso: {formatMinutesToHM(item.rest_time)}
            </ThemedText>
          </ThemedView>
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
