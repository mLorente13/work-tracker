import { useAuth } from "@/app/context/AuthContext";
import { useWorkDay } from "@/app/context/WorkDayContext";
import ActionBtn from "@/components/workday/ActionBtn";
import WorkdayStatusText from "@/components/workday/WorkdayStatusText";
import { supabase } from "@/lib/supabase";
import { calcRestTime, calcWorkTime } from "@/lib/time-utils";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Workday() {
  const { session } = useAuth() as {
    session: {
      user: { id: string; user_metadata?: { username?: string } };
    } | null;
    signOut: () => void;
  };
  const userBreakTime = session?.user.user_metadata?.break_time || 20;

  const {
    workDayStatus,
    isLoaded,
    startWorkDay,
    endWorkDay,
    startRest,
    endRest,
    resetWorkDay,
  } = useWorkDay();

  useEffect(() => {
    if (workDayStatus.status !== "ended") return;
    const saveWorkDay = async () => {
      const restTime = calcRestTime(
        workDayStatus.restStartTime,
        workDayStatus.restEndTime,
        userBreakTime,
      );
      const workDayData = {
        user_id: session?.user.id,
        date:
          workDayStatus.startTime.toISOString().split("T")[0] ||
          new Date().toISOString().split("T")[0],
        work_time:
          calcWorkTime(
            workDayStatus.startTime,
            workDayStatus.endTime,
            restTime / 60,
          ) || 0,
        rest_time: restTime || 0,
      };
      console.log("Saving workday data:", workDayData);
      const { data, error } = await supabase
        .from("workday")
        .insert(workDayData)
        .select();
      if (error) {
        console.error("Error saving workday:", error);
      } else {
        console.log("Workday saved successfully:", data);
        resetWorkDay();
      }
    };
    saveWorkDay();
  }, [userBreakTime, resetWorkDay, workDayStatus, session]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">
        Bienvenido {session?.user?.user_metadata?.username}!
      </Text>
      <View>
        <WorkdayStatusText
          status={workDayStatus.status}
          startTime={workDayStatus.startTime}
          restTime={workDayStatus.restStartTime}
          endTime={workDayStatus.endTime}
        />
        <ActionBtn
          workDayStatus={workDayStatus}
          startWorkDay={startWorkDay}
          endWorkDay={endWorkDay}
          startRest={startRest}
          endRest={endRest}
        />
      </View>
    </SafeAreaView>
  );
}
