export const prepareDayByTime = (params: {
  hours: number;
  minutes: number;
}): number => {
  const now = new Date();
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();

  if (
    params.hours < nowHours ||
    (params.hours === nowHours && params.minutes <= nowMinutes)
  ) {
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    return tomorrow.getDay();
  }

  return now.getDay();
};
