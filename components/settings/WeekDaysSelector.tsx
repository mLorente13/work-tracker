import { WeekDay } from "@/types/weekday";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function WeekDaysSelector({
  weekdays,
  setWeekdays,
  userId,
}: {
  weekdays: WeekDay[];
  setWeekdays: (days: WeekDay[]) => void;
  userId?: string | null;
}) {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const toggleDay = (dayValue: number) => {
    if (selectedDays.includes(dayValue)) {
      const newDays = selectedDays.filter((d) => d !== dayValue);
      setSelectedDays(newDays);
      setWeekdays(weekdays.filter((d) => d.id !== dayValue));
    } else {
      setSelectedDays([...selectedDays, dayValue]);
      setWeekdays([...weekdays, { id: dayValue, name: "" }]);
    }
  };

  const daysOfWeek = [
    { id: 2, name: "Lunes" },
    { id: 3, name: "Martes" },
    { id: 4, name: "Miércoles" },
    { id: 5, name: "Jueves" },
    { id: 6, name: "Viernes" },
    { id: 7, name: "Sábado" },
    { id: 1, name: "Domingo" },
  ];

  return (
    <View className="mt-4 w-full flex-row flex-wrap gap-2 items-start">
      {daysOfWeek.map((day) => (
        <Pressable
          key={day.id}
          onPress={() => toggleDay(day.id)}
          className={`px-4 py-2 rounded-full text-center ${weekdays.some((d) => d.id === day.id) ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
        >
          <Text
            className={
              selectedDays.includes(day.id)
                ? "text-white"
                : "text-black dark:text-white"
            }
          >
            {day.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
