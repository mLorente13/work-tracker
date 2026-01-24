import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const WorkDayContext = createContext();

const STORAGE_KEY = "workday_state";

const initialState = {
  status: "idle",
  startTime: null,
  endTime: null,
  restStartTime: null,
  restEndTime: null,
  totalRestTime: 0,
};

export function WorkDayProvider({ children }) {
  const [workDayStatus, setWorkDayStatus] = useState(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setWorkDayStatus({
            ...parsed,
            startTime: parsed.startTime ? new Date(parsed.startTime) : null,
            endTime: parsed.endTime ? new Date(parsed.endTime) : null,
            restStartTime: parsed.restStartTime
              ? new Date(parsed.restStartTime)
              : null,
            restEndTime: parsed.restEndTime
              ? new Date(parsed.restEndTime)
              : null,
          });
        }
      } catch (e) {
        console.error("Failed to load workday state:", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadState();
  }, []);

  // Persist state on every change (after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workDayStatus));
  }, [workDayStatus, isLoaded]);

  const startWorkDay = () => {
    setWorkDayStatus((prev) => ({
      ...prev,
      status: "working",
      startTime: new Date(),
    }));
  };

  const endWorkDay = () => {
    setWorkDayStatus((prev) => ({
      ...prev,
      status: "ended",
      endTime: new Date(),
    }));
  };

  const startRest = () => {
    setWorkDayStatus((prev) => ({
      ...prev,
      status: "resting",
      restStartTime: new Date(),
    }));
  };

  const endRest = () => {
    setWorkDayStatus((prev) => {
      const restDuration = prev.restStartTime
        ? (new Date().getTime() - prev.restStartTime.getTime()) / 1000
        : 0;
      return {
        ...prev,
        status: "working",
        restEndTime: new Date(),
        totalRestTime: (prev.totalRestTime || 0) + restDuration,
      };
    });
  };

  const resetWorkDay = async () => {
    setWorkDayStatus(initialState);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <WorkDayContext.Provider
      value={{
        workDayStatus,
        isLoaded,
        startWorkDay,
        endWorkDay,
        startRest,
        endRest,
        resetWorkDay,
      }}
    >
      {children}
    </WorkDayContext.Provider>
  );
}

export const useWorkDay = () => {
  const context = useContext(WorkDayContext);
  if (!context) {
    throw new Error("useWorkDay must be used within a WorkDayProvider");
  }
  return context;
};
