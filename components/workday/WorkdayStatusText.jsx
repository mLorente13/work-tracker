import { Text, View } from "react-native";

export default function WorkDayStatusText({
  status,
  startTime,
  endTime,
  restTime,
}) {
  const getStatusText = () => {
    switch (status) {
      case "working":
        return (
          <Text>Jornada en curso desde: {startTime?.toLocaleTimeString()}</Text>
        );
      case "resting":
        return (
          <Text>Descanso en curso desde: {restTime?.toLocaleTimeString()}</Text>
        );
      case "ended":
        return (
          <Text>Jornada finalizada a las: {endTime?.toLocaleTimeString()}</Text>
        );
      case "idle":
      default:
        return <Text>Jornada no iniciada</Text>;
    }
  };

  return <View className="text-lg font-medium">{getStatusText()}</View>;
}
