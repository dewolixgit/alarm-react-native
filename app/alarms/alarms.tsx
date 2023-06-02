import { useFonts } from 'expo-font';
import { Tabs, useFocusEffect, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { FlatList } from 'react-native';

import { CenterScreenMessage } from '../../shared/components/CenterScreenMessage';
import ContentContainer from '../../shared/components/ContentContainer';
import { FullContainerLoader } from '../../shared/components/ui';
import { AlarmOffOptionEnum } from '../../shared/entities/alarm';
import { RingScreenRouteParamsType } from '../../shared/entities/screens/ring';
import { ScheduleScreenParamsType } from '../../shared/entities/screens/schedule';
import Alarm, {
  default as AlarmClass,
  disableAlarm,
  getAlarmState,
  getAllAlarms,
  removeAllAlarms,
  scheduleAlarm,
  stopAlarm,
} from '../../shared/nativeModules/alarmModule/alarmModule';
import { checkActiveAlarmStore } from '../../store/global/CheckActiveAlarmStore';
import { uiStore } from '../../store/global/UIStore/UIStore';
import { userStore } from '../../store/global/UserStore';
import { AlarmsScreenStore } from '../../store/local/AlarmsScreenStore';
import FONTS from '../../styles/fonts';
import disabledAlarms from '../disabledAlarms';
import { LogoutIcon } from '../disabledAlarms/disabledAlarms.styles';
import { BaseDisabler } from '../ring/components/BaseDisabler';
import { MathTask } from '../ring/components/MathTask';
import { ShakeTask } from '../ring/components/ShakeTask';

import { AddAlarmIcon, Container, StyledList } from './alarms.styles';
import { AlarmListItem } from './components';

const MOCK_ALARMS: AlarmClass[] = [
  new AlarmClass({
    uid: '1',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '2',
    offOption: AlarmOffOptionEnum.gesture,
    days: [1, 2, 3],
    hour: 2,
    minutes: 3,
  }),
  new AlarmClass({
    uid: '3',
    offOption: AlarmOffOptionEnum.shake,
    days: [2, 5, 6],
    hour: 8,
    minutes: 12,
  }),
  new AlarmClass({
    uid: '4',
    offOption: AlarmOffOptionEnum.math,
    days: [4, 6],
    hour: 16,
    minutes: 15,
  }),
  new AlarmClass({
    uid: '5',
    offOption: AlarmOffOptionEnum.shake,
    days: [6, 5, 4, 3, 2, 1, 0],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '6',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '7',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '8',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '9',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '10',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '11',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '12',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '13',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
  new AlarmClass({
    uid: '14',
    offOption: AlarmOffOptionEnum.math,
    days: [5, 2, 6],
    hour: 5,
    minutes: 53,
  }),
];

SplashScreen.preventAutoHideAsync();

export const Alarms: React.FC = observer(() => {
  const { push } = useRouter();
  const alarmsScreenStore = useLocalObservable(() => new AlarmsScreenStore());

  const onLayoutRootView = React.useCallback(async () => {
    if (uiStore.isFontsLoaded.value) {
      await SplashScreen.hideAsync();
    }
  }, [uiStore.isFontsLoaded.value]);

  const onPressAddAlarm = React.useCallback(() => {
    push({
      pathname: 'schedule',
      params: {
        alarmUID: '',
      } as ScheduleScreenParamsType,
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onFocusScreen = async () => {
        await uiStore.loadFonts();
        await userStore.init();

        const activeAlarmUID = await getAlarmState();

        if (activeAlarmUID) {
          push({
            pathname: 'ring',
            params: {
              alarmUID: activeAlarmUID,
            } as RingScreenRouteParamsType,
          });
        } else {
          await alarmsScreenStore.init();
          checkActiveAlarmStore.startCheck((uid) =>
            push({
              pathname: 'ring',
              params: {
                alarmUID: uid,
              } as RingScreenRouteParamsType,
            })
          );
        }
      };

      onFocusScreen();

      return () => {
        alarmsScreenStore.reset();
      };
    }, [])
  );

  if (!uiStore.isFontsLoaded.value) {
    return null;
  }

  return (
    <>
      <Tabs.Screen
        options={{
          headerRight: () => <AddAlarmIcon onPress={onPressAddAlarm} />,
        }}
      />
      <Container onLayout={onLayoutRootView}>
        {/*{isLoading && <FullContainerLoader />}*/}

        {alarmsScreenStore.alarms.value.length === 0 && (
          <CenterScreenMessage>
            У вас пока нет сохранённых будильников
          </CenterScreenMessage>
        )}

        {alarmsScreenStore.alarms.value.length > 0 && (
          <StyledList
            data={alarmsScreenStore.alarms.value}
            renderItem={({ item }) => (
              <AlarmListItem key={item.uid} alarm={item} />
            )}
          />
        )}
      </Container>
    </>
  );
});
