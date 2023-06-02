import { useFocusEffect, useRouter, useSearchParams } from 'expo-router';
import * as React from 'react';

import { AlarmOffOptionEnum } from '../../shared/entities/alarm';
import { RingScreenRouteParamsType } from '../../shared/entities/screens/ring';
import Alarm, {
  getAlarm,
  stopAlarm,
} from '../../shared/nativeModules/alarmModule';
import { globalDisabledAlarms } from '../../store/global/GlobalDisabledAlarms';

import { BaseDisabler } from './components/BaseDisabler';
import { MathTask } from './components/MathTask';
import { ShakeTask } from './components/ShakeTask';

export const Ring: React.FC = () => {
  const { push } = useRouter();
  const { alarmUID } = useSearchParams<RingScreenRouteParamsType>();
  const [alarm, setAlarm] = React.useState<null | Alarm>(null);
  const [localIsDisabled, setLocalIsDisabled] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (alarmUID) {
        getAlarm(alarmUID).then(setAlarm);
      }

      return () => {
        setAlarm(null);
      };
    }, [])
  );

  const onClickDisableButton = React.useCallback(async () => {
    if (!alarm) {
      return;
    }

    await stopAlarm();

    if (alarm.offOption === AlarmOffOptionEnum.gesture) {
      await globalDisabledAlarms.handleAddDisabledAlarm({
        hours: alarm.hour,
        minutes: alarm.minutes,
        offOption: alarm.offOption,
      });

      push({
        pathname: 'alarms',
      });

      return;
    }

    setLocalIsDisabled(true);
  }, [alarm]);

  if (!alarm) {
    return null;
  }

  if (!localIsDisabled) {
    return <BaseDisabler onClickDisable={onClickDisableButton} />;
  }

  if (alarm.offOption === AlarmOffOptionEnum.shake) {
    return <ShakeTask alarm={alarm} />;
  }

  if (alarm.offOption === AlarmOffOptionEnum.math) {
    return <MathTask alarm={alarm} />;
  }

  return null;
};
