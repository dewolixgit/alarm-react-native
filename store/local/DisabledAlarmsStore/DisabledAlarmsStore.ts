import { ToastAndroid } from 'react-native';

import { ENDPOINTS } from '../../../shared/entities/api';
import {
  DisabledAlarmType,
  ApiDisabledAlarmType,
  normalizeDisabledAlarm,
} from '../../../shared/entities/disabledAlarm';
import { ValueModel } from '../../../shared/models/ValueModel';
import api from '../../../shared/utils/api';

export class DisabledAlarmsStore {
  readonly isLoading = new ValueModel(false);
  readonly isDeleting = new ValueModel(false);

  readonly alarms = new ValueModel<null | DisabledAlarmType[]>(null);

  init = async (): Promise<void> => {
    if (this.isLoading.value) {
      return;
    }

    this.isLoading.setValue(true);

    const response = await api<{ disabledAlarms: ApiDisabledAlarmType[] }>(
      ENDPOINTS.getDisabledAlarms
    );

    console.log('response', response);

    if (!response.data) {
      this.isLoading.setValue(false);
      ToastAndroid.show('Произошла ошибка', ToastAndroid.SHORT);
      return;
    }

    this.alarms.setValue(
      response.data.disabledAlarms.map(normalizeDisabledAlarm)
    );

    this.isLoading.setValue(false);
  };

  deleteDisabledAlarm = async (id: string): Promise<boolean | null> => {
    if (this.isDeleting.value) {
      return null;
    }

    this.isDeleting.setValue(true);

    const response = await api(ENDPOINTS.deleteDisabledAlarm, {
      id,
    });

    if (!response.data) {
      ToastAndroid.show('Произошла ошибка', ToastAndroid.SHORT);
      this.isDeleting.setValue(false);
      return false;
    }

    this.isDeleting.setValue(false);
    return true;
  };

  reset = () => {
    this.alarms.setValue(null);
    this.isLoading.setValue(false);
    this.isDeleting.setValue(false);
  };
}
