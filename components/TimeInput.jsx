import DateTimePicker from "@react-native-community/datetimepicker";
import { Clock } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function TimeInput({ label, value, onChange }) {
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <View className="flex-1 flex-col gap-2">
      <Text className="text-lg font-semibold">{t(`bottomSheet.${label}`)}</Text>
      <Pressable
        className="flex-1 flex-row justify-between px-4 py-2 rounded-lg bg-zinc-200 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
        onPress={() => {
          setTimePickerOpen(true);
        }}
      >
        <Text className="text-black">
          {new Date(value).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Clock
          className="absolute right-3 top-1/2 -translate-y-1/2"
          size={20}
        />
      </Pressable>
      {timePickerOpen && (
        <DateTimePicker
          value={new Date(value)}
          mode="time"
          display="default"
          open={timePickerOpen}
          onChange={(event, selectedTime) => {
            if (event.type === "set") {
              onChange(selectedTime);
            }
            setTimePickerOpen(false);
          }}
        />
      )}
    </View>
  );
}
