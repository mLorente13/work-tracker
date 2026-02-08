import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function WorkDayStatusText({
  status,
  startTime,
  endTime,
  restTime,
}) {
  const { t } = useTranslation();

  const getStatusText = () => {
    switch (status) {
      case "working":
        return (
          <Text>
            {t("workday.statusWorking", {
              time: startTime?.toLocaleTimeString(),
            })}
          </Text>
        );
      case "resting":
        return (
          <Text>
            {t("workday.statusResting", {
              time: restTime?.toLocaleTimeString(),
            })}
          </Text>
        );
      case "ended":
        return (
          <Text>
            {t("workday.statusEnded", { time: endTime?.toLocaleTimeString() })}
          </Text>
        );
      case "idle":
      default:
        return <Text>{t("workday.statusIdle")}</Text>;
    }
  };

  return <View className="text-lg font-medium">{getStatusText()}</View>;
}
