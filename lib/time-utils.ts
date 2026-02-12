export function calcWorkTime(
  startTime: Date | null,
  endTime: Date | null,
  breakTimeSeconds: number,
): number {
  if (!startTime || !endTime) return 0;
  if (endTime <= startTime) return 0;
  const totalSeconds = Math.round(
    (endTime.getTime() - startTime.getTime()) / 1000,
  );

  return Math.max(0, totalSeconds - Math.max(0, breakTimeSeconds)) / 60;
}

export function calcRestTime(
  startRestTime: Date | null,
  endRestTime: Date | null,
  paidRestTime: number,
): number {
  if (!startRestTime || !endRestTime) return 0;
  if (
    paidRestTime >=
    Math.round((endRestTime.getTime() - startRestTime.getTime()) / 1000)
  ) {
    return 0;
  }
  return (
    Math.round((endRestTime.getTime() - startRestTime.getTime()) / 1000) / 60
  );
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function formatSecondsToHM(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export function formatMinutesToHHMM(totalMinutes: number): string {
  if (totalMinutes === 0) return "00:00";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function formatMinutesToHM(totalMinutes: number): string {
  if (totalMinutes === 0) return "00:00";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours}h ${minutes}m`;
}

export function formatDateToDDMM(date: Date): string {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function getTimeDiffInMinutes(
  startTime: Date | null,
  endTime: Date | null,
): number {
  if (!startTime || !endTime) return 0;
  if (endTime <= startTime) return 0;
  const totalSeconds = Math.round(
    (endTime.getTime() - startTime.getTime()) / 1000,
  );
  return totalSeconds / 60;
}
