export const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Deutsch", value: "de" },
] as const;

export const DAILY_TARGET_OPTIONS = [
  { label: "4h", value: 4 },
  { label: "6h", value: 6 },
  { label: "8h", value: 8 },
  { label: "10h", value: 10 },
] as const;

export const WEEKLY_TARGET_OPTIONS = [
  { label: "20h", value: 20 },
  { label: "30h", value: 30 },
  { label: "40h", value: 40 },
  { label: "48h", value: 48 },
] as const;

export * from "./settings";

