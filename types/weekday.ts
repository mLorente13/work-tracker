export interface WeekDay {
  id: number;
  name: string;
}

export interface ProfileSettings {
  breakTime: number;
  workdayStartTime: Date;
  notificationsEnabled: boolean;
  weekdays: WeekDay[];
}
