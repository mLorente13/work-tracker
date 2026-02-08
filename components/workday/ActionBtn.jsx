import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function ActionBtn({
  workDayStatus,
  startWorkDay,
  endWorkDay,
  startRest,
  endRest,
}) {
  const { t } = useTranslation();

  const renderButton = () => {
    switch (workDayStatus.status) {
      case "working":
        return (
          <View className={"flex flex-col items-center gap-4"}>
            <Pressable
              className="mt-4 w-48 rounded bg-yellow-500 px-4 py-2"
              onPress={startRest}
            >
              <Text className="text-center text-white">
                {t("workday.startRest")}
              </Text>
            </Pressable>
            <Pressable
              className="mt-4 w-48 rounded bg-red-500 px-4 py-2"
              onPress={endWorkDay}
            >
              <Text className="text-center text-white">
                {t("workday.endWorkday")}
              </Text>
            </Pressable>
          </View>
        );
      case "resting":
        return (
          <Pressable
            className="mx-auto mt-4 w-48 rounded bg-blue-500 px-4 py-2"
            onPress={endRest}
          >
            <Text className="text-center text-white">
              {t("workday.endRest")}
            </Text>
          </Pressable>
        );
      case "idle":
        return (
          <Pressable
            className="mt-4 w-48 rounded bg-green-500 px-4 py-2"
            onPress={startWorkDay}
          >
            <Text className="text-center text-white">
              {t("workday.startWorkday")}
            </Text>
          </Pressable>
        );

      default:
        return null;
    }
  };
  return <>{renderButton()}</>;
}
