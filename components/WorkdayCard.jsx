import WorkdayBottomSheet from "@/components/WorkdayBottomSheet";
import {
  calcRestTime,
  calcWorkTime,
  formatDateToDDMM,
  formatMinutesToHHMM,
  getTimeDiffInMinutes,
} from "@/lib/time-utils";
import { Clock, Coffee } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import StatusBadge from "./StatusBadge";

export default function WorkdayCard({ workDay }) {
  const { t } = useTranslation();
  const workTime = workDay.end_time
    ? calcWorkTime(
        new Date(workDay.start_time),
        new Date(workDay.end_time),
        calcRestTime(
          new Date(workDay.start_rest_time),
          new Date(workDay.end_rest_time),
          workDay.paid_rest_time,
        ),
      )
    : getTimeDiffInMinutes(new Date(workDay.start_time), new Date());
  const restTime = formatMinutesToHHMM(workDay.total_rest_time);
  const bottomSheetRef = useRef(null);
  const [workday, setWorkday] = useState(workDay);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    console.log("handlePresentModalPress");
    bottomSheetRef.current?.present();
  }, []);
  const handleSheetDismiss = useCallback((index) => {
    console.log("handleSheetDismiss", index);
  }, []);

  return (
    <View className="w-full">
      <Pressable
        onPress={handlePresentModalPress}
        className="flex-col w-full rounded-lg bg-white p-4 shadow mb-4"
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-lg font-semibold">
            {formatDateToDDMM(new Date(workDay.start_time))}
          </Text>
          <StatusBadge status={workDay.status} />
        </View>
        <View className="flex-row items-center gap-4 mt-2">
          <View className="flex-row gap-2 items-center">
            <Clock size={16} color={"gray"} className="mr-1" />
            <Text className="text-sm text-gray-600">
              {new Date(workDay.start_time).toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            {workDay.end_time && (
              <>
                <Text className="text-sm text-gray-600">-</Text>
                <Text className="text-sm text-gray-600">
                  {new Date(workDay.end_time).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </>
            )}
          </View>
          <View className="flex-row gap-2 items-center">
            <Coffee size={16} color={"gray"} className="mr-1" />
            <Text className="text-sm text-gray-600">{workDay.breaks}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-4 mt-2">
          <View className="flex-col gap-2">
            <Text className="text-sm text-gray-600">
              {t("workday.workTime")}
            </Text>
            <Text className="text-lg font-semibold">
              {formatMinutesToHHMM(workTime)}
            </Text>
          </View>
          <View className="flex-col gap-2">
            <Text className="text-sm text-gray-600">
              {t("workday.restTime")}
            </Text>
            <Text className="text-lg font-semibold">{restTime}</Text>
          </View>
        </View>
      </Pressable>
      <WorkdayBottomSheet
        workday={workday}
        setWorkday={setWorkday}
        ref={bottomSheetRef}
        handleSheetDismiss={handleSheetDismiss}
      />
    </View>
  );
}
