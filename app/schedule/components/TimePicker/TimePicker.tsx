import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import formatTimeColon from '../../../../shared/utils/formatTimeColon';

import { Container, Time } from './TimePicker.styles';

type Props = {
  hours?: number;
  minutes?: number;
  onChangeTime?: (values: { hours: number; minutes: number }) => void;
};

export const TimePicker: React.FC<Props> = ({
  onChangeTime,
  minutes,
  hours,
}) => {
  const onPressTime = React.useCallback(() => {
    const currentDate = new Date();
    currentDate.setHours(hours ?? 0);
    currentDate.setMinutes(minutes ?? 0);

    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (e, selectedDate) => {
        onChangeTime?.({
          hours: selectedDate?.getHours() ?? 0,
          minutes: selectedDate?.getMinutes() ?? 0,
        });
      },
      mode: 'time',
      is24Hour: true,
    });
  }, [minutes, hours, onChangeTime]);

  return (
    <Container>
      <TouchableOpacity onPress={onPressTime}>
        <Time>
          {formatTimeColon({ hours: hours ?? 0, minutes: minutes ?? 0 })}
        </Time>
      </TouchableOpacity>
    </Container>
  );
};
