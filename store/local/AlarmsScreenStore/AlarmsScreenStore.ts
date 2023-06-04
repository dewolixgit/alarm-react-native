import { ValueModel } from '../../../shared/models/ValueModel';
import AlarmClass, {
  getAllAlarms,
} from '../../../shared/nativeModules/alarmModule';
import formatTimeColon from '../../../shared/utils/formatTimeColon';

export class AlarmsScreenStore {
  alarms = new ValueModel<AlarmClass[]>([]);

  init = async () => {
    await getAllAlarms().then(this.alarms.setValue);

    console.log(
      this.alarms.value.map((i) =>
        formatTimeColon({
          hours: i.hour,
          minutes: i.minutes,
        })
      )
    );
  };

  reset = () => {
    this.alarms.setValue([]);
  };
}
