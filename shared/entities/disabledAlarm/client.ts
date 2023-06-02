import formatTimeColon from '../../utils/formatTimeColon';
import { AlarmOffOptionEnum } from '../alarm';

import { ApiDisabledAlarmType } from './server';

export type DisabledAlarmType = {
  id: string;
  timeString: string;
  offOption: AlarmOffOptionEnum;
};

export const normalizeDisabledAlarm = (
  raw: ApiDisabledAlarmType
): DisabledAlarmType => ({
  id: raw._id,
  timeString: formatTimeColon({ hours: raw.hours, minutes: raw.minutes }),
  offOption: raw.offOption,
});
