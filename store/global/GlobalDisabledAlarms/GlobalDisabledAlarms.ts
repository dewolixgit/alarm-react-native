import { ToastAndroid } from 'react-native';

import { AlarmOffOptionEnum } from '../../../shared/entities/alarm';
import { ENDPOINTS } from '../../../shared/entities/api';
import { DisabledAlarmType } from '../../../shared/entities/disabledAlarm';
import { ValueModel } from '../../../shared/models/ValueModel';
import { getAlarm } from '../../../shared/nativeModules/alarmModule';
import api from '../../../shared/utils/api';
import { userStore } from '../UserStore';

class GlobalDisabledAlarms {
  readonly isAdding = new ValueModel(false);

  handleAddDisabledAlarm = async (alarm: {
    hours: number;
    minutes: number;
    offOption: AlarmOffOptionEnum;
  }): Promise<void> => {
    if (!userStore.isAuthorized || this.isAdding.value) {
      return;
    }

    this.isAdding.setValue(true);

    const response = await api(ENDPOINTS.addDisabledAlarms, {
      hours: alarm.hours,
      minutes: alarm.minutes,
      offOption: alarm.offOption,
    });

    if (!response.data) {
      ToastAndroid.show(
        'Произошла ошибка при сохранении отключённого будильника',
        ToastAndroid.SHORT
      );
    }

    this.isAdding.setValue(false);
  };
}

export const globalDisabledAlarms = new GlobalDisabledAlarms();
