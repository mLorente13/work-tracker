import { WeekDay } from "@/types/weekday";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    console.log("Push notifications require a physical device");
    return false;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === "granted";
}

export async function scheduleDailyNotification(
  hour: number,
  minute: number,
  weekdays: WeekDay[],
): Promise<string[] | null> {
  // Cancel existing scheduled notifications first
  await Notifications.cancelAllScheduledNotificationsAsync();

  const ids: string[] = [];
  for (const day of weekdays) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Hora de trabajar!",
        body: "Tu jornada laboral está por comenzar",
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: day.id,
        hour,
        minute,
      },
    });
    ids.push(id);
  }
  return ids;
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
