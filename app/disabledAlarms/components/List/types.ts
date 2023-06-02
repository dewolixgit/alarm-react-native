import { AlarmOffOptionEnum } from '../../../../shared/entities/alarm';

export type DisabledAlarmType = {
  id: string;
  timeString: string;
  offOption: AlarmOffOptionEnum;
};
