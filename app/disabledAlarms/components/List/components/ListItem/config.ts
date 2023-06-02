import { AlarmOffOptionEnum } from '../../../../../../shared/entities/alarm';

export const alarmDisabledText: Record<AlarmOffOptionEnum, string> = {
  [AlarmOffOptionEnum.gesture]: 'Выключен жестом',
  [AlarmOffOptionEnum.math]: 'Выключен математическим упражнением',
  [AlarmOffOptionEnum.shake]: 'Выключен тряской',
};
