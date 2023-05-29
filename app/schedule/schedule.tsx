import { Tabs, useRouter, useSearchParams } from 'expo-router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { View } from 'react-native';

import { Button } from '../../shared/components/Button';
import { ScheduleScreenParamsType } from '../../shared/entities/screens/schedule';
import { removeAlarm } from '../../shared/nativeModules/alarmModule';
import { ScheduleScreenStore } from '../../store/local/ScheduleScreenStore';
import { AddAlarmIcon } from '../alarms/alarms.styles';

import { OffOption, TimePicker, Repeating } from './components';
import { Container, DeleteAlarmIcon } from './schedule.styles';

export const Schedule: React.FC = observer(() => {
  const { push } = useRouter();
  const { alarmUID } = useSearchParams<ScheduleScreenParamsType>();

  const isNewAlarm = !alarmUID;

  const scheduleScreenStore = useLocalObservable(
    () => new ScheduleScreenStore()
  );

  React.useEffect(() => {
    scheduleScreenStore.init({ alarmUID: isNewAlarm ? null : alarmUID });

    return () => {
      scheduleScreenStore.reset();
    };
  }, [alarmUID]);

  const onChangeTime = React.useCallback(
    (values: { hours: number; minutes: number }) => {
      scheduleScreenStore.editModel.value?.minutes.setValue(values.minutes);
      scheduleScreenStore.editModel.value?.hours.setValue(values.hours);
    },
    [scheduleScreenStore.editModel.value]
  );

  const onClickSave = React.useCallback(async () => {
    const result = await scheduleScreenStore.save();

    if (result) {
      push({
        pathname: 'index',
      });
    }
  }, [scheduleScreenStore]);

  const ClickDelete = React.useCallback(async () => {
    if (!alarmUID) {
      return;
    }

    await removeAlarm(alarmUID);
    push({
      pathname: 'index',
    });
  }, [alarmUID]);

  return (
    <>
      <Tabs.Screen
        options={{
          title: isNewAlarm ? 'Новый будильник' : 'Редактирование',
          headerRight: () =>
            isNewAlarm ? null : <DeleteAlarmIcon onPress={ClickDelete} />,
        }}
      />
      {!scheduleScreenStore.editModel.value && null}
      {scheduleScreenStore.editModel.value && (
        <Container>
          <View>
            <TimePicker
              hours={scheduleScreenStore.editModel.value?.hours.value}
              minutes={scheduleScreenStore.editModel.value?.minutes.value}
              onChangeTime={onChangeTime}
            />
            <Repeating
              toRepeat={scheduleScreenStore.editModel.value?.toRepeat.value}
              onChangeToRepeat={
                scheduleScreenStore.editModel.value?.toRepeat.setValue
              }
              onChangeDays={
                scheduleScreenStore.editModel.value?.repeatDays.setValue
              }
              days={scheduleScreenStore.editModel.value?.repeatDays.value}
            />
            <OffOption
              value={scheduleScreenStore.editModel.value?.offOption.value}
              onChangeValue={
                scheduleScreenStore.editModel.value?.offOption.setValue
              }
            />
          </View>
          <Button title="Сохранить" onPress={onClickSave} />
        </Container>
      )}
    </>
  );
});
