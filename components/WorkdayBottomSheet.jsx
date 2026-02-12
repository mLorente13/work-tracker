import { supabase } from "@/lib/supabase";
import { formatDateToDDMM } from "@/lib/time-utils";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Trash } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import TimeInput from "./TimeInput";

const WorkdayBottomSheet = React.forwardRef(
  ({ workday, setWorkday, handleSheetDismiss }, ref) => {
    const { t } = useTranslation();
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const openDatePicker = () => {
      setDatePickerOpen(true);
    };

    const handleDateChange = () => (event, selectedDate) => {
      setDatePickerOpen(false);
      if (event.type === "set") {
        setWorkday({ ...workday, date: selectedDate });
      }
    };

    const handleWorkdaySave = async () => {
      const { data, error } = await supabase
        .from("workdays")
        .update({
          date: workday.date,
          start_time: workday.start_time,
          end_time: workday.end_time,
          notes: workday.notes,
        })
        .eq("id", workday.id);
      if (error) {
        console.error("Error updating workday:", error);
      } else {
        console.log("Workday updated successfully:", data);
        handleSheetDismiss();
      }
    };

    return (
      <BottomSheetModal ref={ref} onChange={handleSheetDismiss}>
        <BottomSheetView style={styles.modal}>
          <Text className="text-2xl font-bold">{t("bottomSheet.title")}</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg font-semibold">
              {t("bottomSheet.date")}
            </Text>
            <Pressable
              className="flex-row justify-between bg-zinc-200 px-3 py-2 rounded-lg w-full focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
              onPress={openDatePicker}
            >
              <Text>{formatDateToDDMM(new Date(workday.date))}</Text>
              <Calendar
                className="absolute right-3 top-1/2 -translate-y-1/2"
                size={20}
              />
            </Pressable>
            {datePickerOpen && (
              <DateTimePicker
                value={new Date(workday.date)}
                mode="date"
                display="default"
                className="bg-red-500"
                open={datePickerOpen}
                onChange={handleDateChange()}
              />
            )}
          </View>

          <View className="flex-row gap-4">
            <TimeInput
              label={"startTime"}
              value={workday.start_time}
              onChange={(newTime) => {
                // Handle the new time here
                console.log("Selected time:", newTime);
                setWorkday({ ...workday, start_time: newTime });
              }}
            />
            <TimeInput
              label={"endTime"}
              value={workday.end_time}
              onChange={(newTime) => {
                // Handle the new time here
                console.log("Selected time:", newTime);
                setWorkday({ ...workday, end_time: newTime });
              }}
            />
          </View>
          <View className="flex-col gap-2">
            <Text className="text-lg font-semibold">
              {t("bottomSheet.notes.label")}
            </Text>
            <TextInput
              placeholder={t("bottomSheet.notes.placeholder")}
              multiline
              className="border border-gray-300 rounded-lg p-2"
              value={workday.notes}
              onChangeText={(text) => setWorkday({ ...workday, notes: text })}
            />
          </View>
          <View className="flex-col gap-2">
            <Pressable
              className="bg-blue-500 px-4 py-4 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
              onPress={() => {
                // Handle save action here
                console.log("Saved workday:", workday);
                handleWorkdaySave();
              }}
            >
              <Text className="text-center text-lg text-white font-semibold">
                {t("bottomSheet.save")}
              </Text>
            </Pressable>
            <Pressable
              className="flex-row items-center justify-center gap-2 border-2 border-red-500 px-4 py-4 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-gray-500"
              onPress={handleSheetDismiss}
            >
              <Trash className="mx-auto" size={20} color="#ef4444" />
              <Text className="text-center text-lg text-red-500 font-semibold">
                {t("bottomSheet.delete")}
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

WorkdayBottomSheet.displayName = "WorkdayBottomSheet";

export default WorkdayBottomSheet;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    justifyContent: "flex-start",
    alignItems: "start",
  },
});
