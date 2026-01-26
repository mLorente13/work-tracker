export function calcWorkTime(
  startTime: Date | null,
  endTime: Date | null,
  breakTimeMinutes: number,
): number {
  if (!startTime || !endTime) return 0;
  if (endTime <= startTime) return 0;
  const totalSeconds = Math.round(
    (endTime.getTime() - startTime.getTime()) / 1000,
  );
  const breakTimeInSeconds = breakTimeMinutes * 60;
  return Math.max(0, totalSeconds - Math.max(0, breakTimeInSeconds));
}

export function calcRestTime(
  startRestTime: Date | null,
  endRestTime: Date | null,
  paidRestTime: number,
): number {
  if (!startRestTime || !endRestTime) return 0;
  if (
    paidRestTime * 60 >=
    Math.round((endRestTime.getTime() - startRestTime.getTime()) / 1000)
  ) {
    return 0;
  }
  return Math.round((endRestTime.getTime() - startRestTime.getTime()) / 1000);
}

export function formatSecondsToHM(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export function formatMinutesToHM(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}
