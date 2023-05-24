export enum WeekdayEnum {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

export const shortRusWeekDays: Record<WeekdayEnum, string> = {
  [WeekdayEnum.monday]: 'Пн',
  [WeekdayEnum.tuesday]: 'Вт',
  [WeekdayEnum.wednesday]: 'Ср',
  [WeekdayEnum.thursday]: 'Чт',
  [WeekdayEnum.friday]: 'Пт',
  [WeekdayEnum.saturday]: 'Сб',
  [WeekdayEnum.sunday]: 'Вс',
};

export const DAYS_IN_WEEK = 7;
