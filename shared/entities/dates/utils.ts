import { DAYS_IN_WEEK, WeekdayEnum } from './client';

export const isEveryWeekDay = (weekDays: WeekdayEnum[]): boolean => {
  // For unique days extraction
  const weekDaysSet = new Set(weekDays);

  return weekDaysSet.size === DAYS_IN_WEEK;
};

export const sortWeekdaysFromMonday = (
  weekDays: WeekdayEnum[]
): WeekdayEnum[] => {
  const sorter: Record<WeekdayEnum, number> = {
    [WeekdayEnum.monday]: 1,
    [WeekdayEnum.tuesday]: 2,
    [WeekdayEnum.wednesday]: 3,
    [WeekdayEnum.thursday]: 4,
    [WeekdayEnum.friday]: 5,
    [WeekdayEnum.saturday]: 6,
    [WeekdayEnum.sunday]: 7,
  };

  return weekDays.slice().sort((day1, day2) => sorter[day1] - sorter[day2]);
};
