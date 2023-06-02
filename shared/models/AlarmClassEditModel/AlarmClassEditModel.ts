import { AlarmOffOptionEnum } from '../../entities/alarm';
import {
  enumWeekDayToJSNumber,
  jsNumberWeekDayToEnum,
  WeekdayEnum,
} from '../../entities/dates';
import Alarm from '../../nativeModules/alarmModule';
import { ValueModel } from '../ValueModel';

import { prepareDayByTime } from './utils';

type AlarmClassEditModelParamsType = {
  hours: number;
  minutes: number;
  toRepeat: boolean;
  repeatDays: WeekdayEnum[];
  offOption: AlarmOffOptionEnum;
};

export class AlarmClassEditModel {
  hours: ValueModel<number>;
  minutes: ValueModel<number>;
  toRepeat: ValueModel<boolean>;
  repeatDays: ValueModel<WeekdayEnum[]>;
  offOption: ValueModel<AlarmOffOptionEnum>;

  constructor(params: AlarmClassEditModelParamsType) {
    this.hours = new ValueModel(params.hours);
    this.minutes = new ValueModel(params.minutes);
    this.toRepeat = new ValueModel(params.toRepeat);
    this.repeatDays = new ValueModel(params.repeatDays);
    this.offOption = new ValueModel(params.offOption);
  }

  toAlarmClass = (alarmUID?: string): Alarm => {
    return new Alarm({
      uid: alarmUID,
      hour: this.hours.value,
      minutes: this.minutes.value,
      repeating: this.toRepeat.value,
      days: this.toRepeat.value
        ? this.repeatDays.value.map(enumWeekDayToJSNumber)
        : [
            prepareDayByTime({
              hours: this.hours.value,
              minutes: this.minutes.value,
            }),
          ],
      offOption: this.offOption.value,
    });
  };

  static fromAlarmClass(alarmClass: Alarm): AlarmClassEditModel {
    return new AlarmClassEditModel({
      hours: alarmClass.hour,
      minutes: alarmClass.minutes,
      toRepeat: alarmClass.repeating,
      repeatDays: alarmClass.days.map(jsNumberWeekDayToEnum),
      offOption: alarmClass.offOption,
    });
  }

  static createDefault(): AlarmClassEditModel {
    return new AlarmClassEditModel({
      hours: 8,
      minutes: 0,
      offOption: AlarmOffOptionEnum.gesture,
      repeatDays: [],
      toRepeat: false,
    });
  }
}
