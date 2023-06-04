import { useFocusEffect } from 'expo-router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';

import { Button } from '../../../../shared/components/Button';
import { CenterScreenMessage } from '../../../../shared/components/CenterScreenMessage';
import { FullContainerLoader } from '../../../../shared/components/ui';
import { AlarmOffOptionEnum } from '../../../../shared/entities/alarm';
import { DisabledAlarmType } from '../../../../shared/entities/disabledAlarm';
import { globalDisabledAlarms } from '../../../../store/global/GlobalDisabledAlarms';
import {
  DisabledAlarmsStore,
  DisabledAlarmsStoreContextProvider,
} from '../../../../store/local/DisabledAlarmsStore';

import { StyledList } from './List.styles';
import { ListItem } from './components';

const MOCK_LIST: DisabledAlarmType[] = [
  {
    id: '1',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '2',
    offOption: AlarmOffOptionEnum.shake,
    timeString: '05:05',
  },
  {
    id: '3',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '4',
    offOption: AlarmOffOptionEnum.gesture,
    timeString: '05:05',
  },
  {
    id: '5',
    offOption: AlarmOffOptionEnum.gesture,
    timeString: '05:05',
  },
  {
    id: '6',
    offOption: AlarmOffOptionEnum.shake,
    timeString: '05:05',
  },
  {
    id: '7',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '8',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '9',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '10',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '11',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '12',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '13',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '14',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
  {
    id: '15',
    offOption: AlarmOffOptionEnum.math,
    timeString: '05:05',
  },
];

export const List: React.FC = observer(() => {
  const store = useLocalObservable(() => new DisabledAlarmsStore());

  useFocusEffect(
    React.useCallback(() => {
      store.init();
      return () => {
        store.reset();
      };
    }, [])
  );

  if (store.isLoading.value) {
    return <FullContainerLoader />;
  }

  const alarms = store.alarms.value;

  if (!alarms || alarms.length === 0) {
    return (
      <CenterScreenMessage>
        Пока нет сохранённых выключенных будильников
      </CenterScreenMessage>
    );
  }

  return (
    <DisabledAlarmsStoreContextProvider value={store}>
      <StyledList
        data={alarms.slice().reverse()}
        renderItem={({ item, index }) => (
          <ListItem
            key={item.id}
            alarm={item}
            isLastInList={alarms.length - 1 === index}
          />
        )}
      />
    </DisabledAlarmsStoreContextProvider>
  );
});
