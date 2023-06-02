import { AlarmOffOptionEnum } from '../alarm';

export type ApiDisabledAlarmType = {
  _id: string;
  hours: number;
  minutes: number;
  offOption: AlarmOffOptionEnum;
};
