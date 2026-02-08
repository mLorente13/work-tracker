// hooks/use-profile-settings.ts
import { useAuth } from "@/app/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Settings } from "@/lib/types";
import { useEffect, useState } from "react";

export function useProfileSettings() {
  const { session } = useAuth();
  const [userSettings, setUserSettings] = useState<Settings>();
  const userId = session?.user?.id;
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    async function fetchUserSettings() {
      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) {
        console.error("Error fetching user settings:", error);
      } else if (data) {
        console.log("Fetched user settings:", data);
        setUserSettings({
          theme: data.theme,
          language: data.language,
          notificationsEnabled: data.notifications_enabled,
          workingDays: data.working_days,
          notificationTime: data.notification_time,
          breakReminders: data.break_reminders,
          breakInterval: data.break_interval,
          endDayReminder: data.end_day_reminder,
          endDayTime: data.end_day_time,
          defaultStartTime: data.default_start_time,
          defaultEndTime: data.default_end_time,
          targetHoursPerDay: data.target_hours_per_day,
          targetHoursPerWeek: data.target_hours_per_week,
        } as Settings);
      }
      setLoading(false);
    }
    fetchUserSettings();
  }, [userId]);

  useEffect(() => {
    if (!userId || !userSettings) return;
    async function updateUserSettings() {
      console.log("Updating user settings:", userSettings);
      console.log("User ID:", userId);
      setUpdating(true);
      const { error } = await supabase
        .from("user_settings")
        .update({
          theme: userSettings.theme,
          language: userSettings.language,
          notificationsEnabled: userSettings.notifications_enabled,
          workingDays: userSettings.working_days,
          notificationTime: userSettings.notification_time,
          breakReminders: userSettings.break_reminders,
          breakInterval: userSettings.break_interval,
          endDayReminder: userSettings.end_day_reminder,
          endDayTime: userSettings.end_day_time,
          defaultStartTime: userSettings.default_start_time,
          defaultEndTime: userSettings.default_end_time,
          targetHoursPerDay: userSettings.target_hours_per_day,
          targetHoursPerWeek: userSettings.target_hours_per_week,
        })
        .eq("id", userId);
      if (error) {
        console.error("Error updating user settings:", error);
      }
      setUpdating(false);
    }
    updateUserSettings();
  }, [userId, userSettings]);

  // async function saveProfileWorkDays() {
  //   if (!userId) return;

  //   const { data, error } = await supabase
  //     .from("weekday_profile")
  //     .delete()
  //     .eq("profile_id", userId);
  //   if (error) {
  //     console.error("Error clearing existing workdays:", error);
  //     return;
  //   }
  //   const inserts = weekdays.map((day) => ({
  //     profile_id: userId,
  //     weekday_id: day.id,
  //   }));
  //   if (inserts.length === 0) return;

  //   const { error: insertError } = await supabase
  //     .from("weekday_profile")
  //     .insert(inserts);
  //   if (insertError) {
  //     console.error("Error inserting workdays:", insertError);
  //   }
  // }

  // async function saveProfile() {
  //   if (!userId) return;
  //   setUpdating(true);

  //   const timeString = `${workdayStartTime.getHours().toString().padStart(2, "0")}:${workdayStartTime.getMinutes().toString().padStart(2, "0")}`;
  //   saveProfileWorkDays();
  //   const { error } = await supabase
  //     .from("profiles")
  //     .update({
  //       break_time: breakTime,
  //       workday_start_time: timeString,
  //       notifications_enabled: notificationsEnabled,
  //     })
  //     .eq("id", userId);

  //   if (error) {
  //     console.error("Error updating profile:", error);
  //     Alert.alert("Error", "No se pudo guardar la configuración");
  //   } else {
  //     if (notificationsEnabled && weekdays.length > 0) {
  //       await scheduleDailyNotification(
  //         workdayStartTime.getHours(),
  //         workdayStartTime.getMinutes(),
  //         weekdays,
  //       );
  //     } else {
  //       await cancelAllNotifications();
  //     }
  //     Alert.alert("Éxito", "Configuración guardada correctamente");
  //   }
  //   setUpdating(false);
  // }

  return {
    // State
    userSettings,
    setUserSettings,
    loading,
    updating,
    // Actions
    // saveProfile,
  };
}
