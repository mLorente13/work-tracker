export interface Break {
  id: string;
  startTime: Date;
  endTime: Date | null;
}

export interface Workday {
  id: string;
  date: string;
  startTime: Date;
  endTime: Date | null;
  breaks: Break[];
  status: "in-progress" | "on-break" | "completed";
  notes?: string;
}

export interface Settings {
  theme: "dark" | "light" | "system";
  language: "en" | "es" | "de" | "fr" | "pt";
  notificationsEnabled: boolean;
  workingDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  notificationTime: string; // HH:mm format
  breakReminders?: boolean;
  breakInterval?: number; // minutes
  endDayReminder?: boolean;
  endDayTime?: string; // HH:mm format
  defaultStartTime?: string; // HH:mm format
  defaultEndTime?: string; // HH:mm format
  targetHoursPerDay?: number; // target work hours per day
  targetHoursPerWeek?: number; // target work hours per week
}

export type ViewType = "main" | "tracking" | "settings";
