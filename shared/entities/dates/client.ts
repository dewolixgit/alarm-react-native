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

export const WEEK_DAYS_ORDER: WeekdayEnum[] = [
  WeekdayEnum.monday,
  WeekdayEnum.tuesday,
  WeekdayEnum.wednesday,
  WeekdayEnum.thursday,
  WeekdayEnum.friday,
  WeekdayEnum.saturday,
  WeekdayEnum.sunday,
];

export const jsWeekDayToEnumMap: Record<number, WeekdayEnum> = {
  [0]: WeekdayEnum.sunday,
  [1]: WeekdayEnum.monday,
  [2]: WeekdayEnum.tuesday,
  [3]: WeekdayEnum.wednesday,
  [4]: WeekdayEnum.thursday,
  [5]: WeekdayEnum.friday,
  [6]: WeekdayEnum.saturday,
};

export const enumWeekDayToJSNumberMap: Record<WeekdayEnum, number> = {
  [WeekdayEnum.sunday]: 0,
  [WeekdayEnum.monday]: 1,
  [WeekdayEnum.tuesday]: 2,
  [WeekdayEnum.wednesday]: 3,
  [WeekdayEnum.thursday]: 4,
  [WeekdayEnum.friday]: 5,
  [WeekdayEnum.saturday]: 6,
};
