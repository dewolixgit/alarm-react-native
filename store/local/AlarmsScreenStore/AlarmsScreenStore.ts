import { ValueModel } from '../../../shared/models/ValueModel';
import AlarmClass, {
  getAllAlarms,
} from '../../../shared/nativeModules/alarmModule';

export class AlarmsScreenStore {
  alarms = new ValueModel<AlarmClass[]>([]);

  init = async () => {
    await getAllAlarms().then(this.alarms.setValue);
  };

  reset = () => {
    this.alarms.setValue([]);
  };
}
