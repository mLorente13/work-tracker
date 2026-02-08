import { useAuth } from "@/app/context/AuthContext";
import { useThemeContext } from "@/app/context/ThemeContext";
import DropdownSetting from "@/components/settings/Dropdown";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { SettingsSection } from "@/components/settings/SettingsSection";
import ThemeSelector from "@/components/settings/ThemeSelector";
import { useProfileSettings } from "@/hooks/use-profile-settings";
import {
  DAILY_TARGET_OPTIONS,
  LANGUAGES,
  WEEKLY_TARGET_OPTIONS,
} from "@/lib/constants/settings";
import i18n from "@/lib/i18n";
import { requestPermissions } from "@/lib/notifications";
import { Globe, LogOut, Smartphone, Target } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { themePreference, setThemePreference } = useThemeContext();
  const { userSettings, setUserSettings, loading, updating } =
    useProfileSettings();
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === "ios");

  async function handleNotificationToggle(enabled: boolean) {
    if (enabled) {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          t("settings.permissionsRequired"),
          t("settings.permissionsMessage"),
        );
        return;
      }
    }
    setUserSettings({
      ...userSettings,
      notificationsEnabled: enabled,
    });
  }

  // const onTimeChange = (_event: any, selectedDate?: Date) => {
  //   if (Platform.OS === "android") {
  //     setShowTimePicker(false);
  //   }
  //   if (selectedDate) {
  //     setUserSettings({
  //       ...userSettings,
  //       defaultStartTime: selectedDate,
  //     });
  //   }
  // };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>{t("settings.loadingConfig")}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="w-full flex-1">
      <View className="p-2 flex-col gap-2 border-b border-gray-300 pb-4 mb-4 dark:border-gray-600">
        <Text className="text-3xl font-bold">{t("settings.title")}</Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          {t("settings.subtitle")}
        </Text>
      </View>
      <View className="flex-col gap-4 px-4">
        <SettingsSection
          icon={<Smartphone size={24} color={"blue"} />}
          title={t("settings.appearance")}
        >
          <SettingsRow label={t("settings.theme")}>
            <ThemeSelector
              currentTheme={themePreference}
              updateTheme={(theme) => {
                setThemePreference(theme);
                setUserSettings({ ...userSettings, theme });
              }}
            />
          </SettingsRow>
          <SettingsRow
            icon={<Globe size={16} />}
            label={t("settings.language")}
          >
            <DropdownSetting
              items={LANGUAGES}
              value={userSettings?.language}
              onChange={(language) => {
                setUserSettings({ ...userSettings, language: language.value });
                i18n.changeLanguage(language.value);
              }}
            />
          </SettingsRow>
        </SettingsSection>
        <SettingsSection
          title={t("settings.workGoals")}
          icon={<Target size={24} color={"blue"} />}
        >
          <SettingsRow
            label={t("settings.dailyTarget.label")}
            subtitle={t("settings.dailyTarget.subtitle")}
          >
            <DropdownSetting
              items={DAILY_TARGET_OPTIONS}
              value={userSettings?.targetHoursPerDay}
              onChange={(dailyTarget) => {
                setUserSettings({
                  ...userSettings,
                  targetHoursPerDay: dailyTarget.value,
                });
              }}
            />
          </SettingsRow>
          <SettingsRow
            label={t("settings.weeklyTarget.label")}
            subtitle={t("settings.weeklyTarget.subtitle")}
          >
            <DropdownSetting
              items={WEEKLY_TARGET_OPTIONS}
              value={userSettings?.targetHoursPerWeek}
              onChange={(weeklyTarget) => {
                setUserSettings({
                  ...userSettings,
                  targetHoursPerWeek: weeklyTarget.value,
                });
              }}
            />
          </SettingsRow>
        </SettingsSection>
        {/* <View>
          <Text className="text-lg font-medium">
            Tiempo de descanso (minutos):
          </Text>
          <TextInput
            className="mt-2 rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            keyboardType="numeric"
            value={breakTime?.toString() || "0"}
            onChangeText={(text) => setBreakTime(Number(text))}
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
        </View> */}

        {/* <Pressable
          className={`mt-4 rounded px-4 py-3 ${updating ? "bg-blue-300" : "bg-blue-500"}`}
          onPress={saveProfile}
          disabled={updating}
        >
          <Text className="text-center text-white font-medium">
            {updating ? "Guardando..." : "Guardar configuración"}
          </Text>
        </Pressable> */}
      </View>

      <Pressable
        className="absolute bottom-4 w-full rounded-full px-4 py-2 bg-red-500 flex-row items-center justify-center gap-2"
        onPress={signOut}
      >
        <Text className="text-white font-bold py-2">
          {t("settings.signOut")}
        </Text>
        <LogOut size={20} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
