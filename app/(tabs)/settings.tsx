import { useAuth } from "@/app/context/AuthContext";
import WeekDaysSelector from "@/components/settings/WeekDaysSelector";
import { useProfileSettings } from "@/hooks/use-profile-settings";
import { requestPermissions } from "@/lib/notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LogOut } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { signOut } = useAuth();
  const {
    breakTime,
    setBreakTime,
    workdayStartTime,
    setWorkdayStartTime,
    notificationsEnabled,
    setNotificationsEnabled,
    weekdays,
    setWeekdays,
    loading,
    updating,
    saveProfile,
  } = useProfileSettings();
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === "ios");

  async function handleNotificationToggle(enabled: boolean) {
    if (enabled) {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permisos requeridos",
          "Necesitas habilitar los permisos de notificaciones en la configuración del dispositivo",
        );
        return;
      }
    }
    setNotificationsEnabled(enabled);
  }

  const onTimeChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      setWorkdayStartTime(selectedDate);
    }
  };

  return (
    <SafeAreaView className="w-10/12 mx-auto flex-1">
      <Text className="mb-4 text-2xl font-bold">Ajustes</Text>
      <View className="gap-4">
        <View>
          <Text className="text-lg font-medium">
            Tiempo de descanso (minutos):
          </Text>
          <TextInput
            className="mt-2 rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            keyboardType="numeric"
            value={breakTime.toString()}
            onChangeText={(text) => setBreakTime(Number(text) || 0)}
            editable={!updating}
          />
        </View>

        <View className="flex-col flex-wrap justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-medium">Notificación diaria:</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
            />
          </View>
          {notificationsEnabled && (
            <View className="">
              <Text className="text-lg font-medium">
                Hora de inicio de jornada:
              </Text>
              {Platform.OS === "android" && (
                <Pressable
                  className="mt-2 rounded border border-gray-300 px-3 py-3 dark:border-gray-600 dark:bg-gray-800"
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text className="dark:text-white">
                    {workdayStartTime.getHours().toString().padStart(2, "0")}:
                    {workdayStartTime.getMinutes().toString().padStart(2, "0")}
                  </Text>
                </Pressable>
              )}
              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  value={workdayStartTime}
                  onChange={onTimeChange}
                  is24Hour={true}
                />
              )}
              <WeekDaysSelector weekdays={weekdays} setWeekdays={setWeekdays} />
            </View>
          )}
        </View>

        <Pressable
          className={`mt-4 rounded px-4 py-3 ${updating ? "bg-blue-300" : "bg-blue-500"}`}
          onPress={saveProfile}
          disabled={updating}
        >
          <Text className="text-center text-white font-medium">
            {updating ? "Guardando..." : "Guardar configuración"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        className="absolute bottom-4 w-full rounded-full px-4 py-2 bg-red-500 flex-row items-center justify-center gap-2"
        onPress={signOut}
      >
        <Text className="text-white font-bold py-2">Cerrar sesión</Text>
        <LogOut size={20} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
