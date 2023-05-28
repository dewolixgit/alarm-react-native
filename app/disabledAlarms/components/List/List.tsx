import * as React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import ContentContainer from '../../../../shared/components/ContentContainer';
import { Heading } from '../../../../shared/components/typography';
import { AlarmOffOptionEnum } from '../../../../shared/entities/alarm';
import { COLORS } from '../../../../styles/colors';

import {
  EmptyMessage,
  EmptyMessageContainer,
  Loader,
  StyledList,
} from './List.styles';
import { ListItem } from './components';
import { DisabledAlarmType } from './types';

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

export const List: React.FC = () => {
  const disabledAlarms = MOCK_LIST;
  const loading = false;

  if (loading) {
    return <Loader />;
  }

  if (disabledAlarms.length === 0) {
    return (
      <EmptyMessageContainer>
        <EmptyMessage>
          Пока нет сохранённых выключенных будильников
        </EmptyMessage>
      </EmptyMessageContainer>
    );
  }

  return (
    <StyledList
      data={MOCK_LIST}
      renderItem={({ item, index }) => (
        <ListItem
          key={item.id}
          alarm={item}
          isLastInList={disabledAlarms.length - 1 === index}
        />
      )}
    />
  );
};
