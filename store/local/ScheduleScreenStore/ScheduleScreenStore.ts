import { AlarmClassEditModel } from '../../../shared/models/AlarmClassEditModel';
import { ValueModel } from '../../../shared/models/ValueModel';
import {
  getAlarm,
  scheduleAlarm,
  updateAlarm,
} from '../../../shared/nativeModules/alarmModule';
import pipe from '../../../shared/utils/pipe';

export class ScheduleScreenStore {
  alarmUID = new ValueModel<string | null>(null);

  editModel = new ValueModel<AlarmClassEditModel | null>(null);

  init = async (params: { alarmUID: string | null }): Promise<void> => {
    // To create new
    if (!params.alarmUID) {
      pipe(AlarmClassEditModel.createDefault(), this.editModel.setValue);
      return;
    }

    this.alarmUID.setValue(params.alarmUID);
    const alarmClass = await getAlarm(params.alarmUID);
    pipe(
      alarmClass,
      AlarmClassEditModel.fromAlarmClass,
      this.editModel.setValue
    );
  };

  /**
   * Return: true – success, false – error
   */
  save = async (): Promise<boolean> => {
    const editModel = this.editModel.value;

    if (!editModel) {
      return false;
    }

    // To create new
    if (!this.alarmUID.value) {
      await scheduleAlarm(editModel.toAlarmClass());
      return true;
    }

    await updateAlarm(editModel.toAlarmClass(this.alarmUID.value ?? undefined));
    return true;
  };

  reset = () => {
    this.editModel.setValue(null);
    this.alarmUID.setValue(null);
  };
}
