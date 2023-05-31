import { useRouter } from 'expo-router';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import Alarm from '../../../../shared/components/Alarm/Alarm';
import {
  jsNumberWeekDayToEnum,
  WeekdayEnum,
} from '../../../../shared/entities/dates';
import { ScheduleScreenParamsType } from '../../../../shared/entities/screens/schedule';
import AlarmClass, {
  disableAlarm,
  enableAlarm,
} from '../../../../shared/nativeModules/alarmModule/alarmModule';

import { AlarmItem } from './AlarmListItem.styles';

type Props = {
  alarm: AlarmClass;
};

export const AlarmListItem: React.FC<Props> = React.memo(({ alarm }) => {
  const { push } = useRouter();
  const [localActiveState, setLocalActiveState] = React.useState(alarm.active);

  const formattedTime = React.useMemo(
    () => alarm.getTimeStringColonFormat(),
    [alarm]
  );

  const preparedWeekDays = React.useMemo(
    () => alarm.days.map(jsNumberWeekDayToEnum),
    [alarm]
  );

  const onPressEdit = React.useCallback(() => {
    push({
      pathname: 'schedule',
      params: {
        alarmUID: alarm.uid,
      } as ScheduleScreenParamsType,
    });
  }, [alarm]);

  const onChangeSwitchValue = React.useCallback(
    async (toEnable: boolean) => {
      if (toEnable) {
        await enableAlarm(alarm.uid);
        setLocalActiveState(true);
        return;
      }

      await disableAlarm(alarm.uid);
      setLocalActiveState(false);
    },
    [alarm]
  );

  return (
    <AlarmItem
      time={formattedTime}
      offOption={alarm.offOption}
      repeating={alarm.repeating}
      repeatWeekDays={preparedWeekDays}
      onPressEdit={onPressEdit}
      switchValue={localActiveState}
      onChangeSwitchValue={onChangeSwitchValue}
    />
  );
});
