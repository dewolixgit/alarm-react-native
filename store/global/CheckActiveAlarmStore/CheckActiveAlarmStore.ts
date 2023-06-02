import { ValueModel } from '../../../shared/models/ValueModel';
import { getAlarmState } from '../../../shared/nativeModules/alarmModule';

class CheckActiveAlarmStore {
  readonly interval = new ValueModel<NodeJS.Timeout | null>(null);

  startCheck = (onFind: (activeAlarmUID: string) => void) => {
    if (this.interval.value) {
      this.stopCheck();
    }

    this.interval.setValue(
      setInterval(async () => {
        const activeAlarmUID = await getAlarmState();

        if (activeAlarmUID) {
          onFind(activeAlarmUID);
        }
      }, 7000)
    );
  };

  stopCheck = () => {
    if (this.interval.value) {
      clearInterval(this.interval.value);
    }
  };
}

export const checkActiveAlarmStore = new CheckActiveAlarmStore();
