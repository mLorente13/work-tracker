// hooks/use-profile-settings.ts
import { useAuth } from "@/app/context/AuthContext";
import {
  cancelAllNotifications,
  scheduleDailyNotification,
} from "@/lib/notifications";
import { supabase } from "@/lib/supabase";
import { WeekDay } from "@/types/weekday";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

interface ProfileSettings {
  breakTime: number;
  workdayStartTime: Date;
  notificationsEnabled: boolean;
  weekdays: WeekDay[];
}

export function useProfileSettings() {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const [breakTime, setBreakTime] = useState(0);
  const [workdayStartTime, setWorkdayStartTime] = useState(new Date());
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [weekdays, setWeekdays] = useState<WeekDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    async function fetchProfile() {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*, weekday_profile(weekday:weekday_id(id, name))")
        .eq("id", userId)
        .single();
      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setNotificationsEnabled(data.notifications_enabled);
        setWeekdays(
          data.weekday_profile.map((wp: any) => wp.weekday) as WeekDay[],
        );
        setBreakTime(data.break_time);
        setNotificationsEnabled(data.notifications_enabled);
        if (data.workday_start_time) {
          const [h, m] = data.workday_start_time.split(":").map(Number);
          const date = new Date();
          date.setHours(h, m, 0, 0);
          setWorkdayStartTime(date);
        }
      }
      setLoading(false);
    }

    fetchProfile();
  }, [userId]);

  async function saveProfileWorkDays() {
    if (!userId) return;

    const { data, error } = await supabase
      .from("weekday_profile")
      .delete()
      .eq("profile_id", userId);
    if (error) {
      console.error("Error clearing existing workdays:", error);
      return;
    }
    const inserts = weekdays.map((day) => ({
      profile_id: userId,
      weekday_id: day.id,
    }));
    if (inserts.length === 0) return;

    const { error: insertError } = await supabase
      .from("weekday_profile")
      .insert(inserts);
    if (insertError) {
      console.error("Error inserting workdays:", insertError);
    }
  }

  async function saveProfile() {
    if (!userId) return;
    setUpdating(true);

    const timeString = `${workdayStartTime.getHours().toString().padStart(2, "0")}:${workdayStartTime.getMinutes().toString().padStart(2, "0")}`;
    saveProfileWorkDays();
    const { error } = await supabase
      .from("profiles")
      .update({
        break_time: breakTime,
        workday_start_time: timeString,
        notifications_enabled: notificationsEnabled,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "No se pudo guardar la configuración");
    } else {
      if (notificationsEnabled && weekdays.length > 0) {
        await scheduleDailyNotification(
          workdayStartTime.getHours(),
          workdayStartTime.getMinutes(),
          weekdays,
        );
      } else {
        await cancelAllNotifications();
      }
      Alert.alert("Éxito", "Configuración guardada correctamente");
    }
    setUpdating(false);
  }

  return {
    // State
    weekdays,
    setWeekdays,
    breakTime,
    setBreakTime,
    workdayStartTime,
    setWorkdayStartTime,
    notificationsEnabled,
    setNotificationsEnabled,
    // Status
    loading,
    updating,
    // Actions
    saveProfile,
  };
}
