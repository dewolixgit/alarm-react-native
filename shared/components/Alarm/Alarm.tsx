import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';

import { COLORS } from '../../../styles/colors';
import { blockShadow1 } from '../../../styles/mixins';
import {
  AlarmOffOptionEnum,
  alarmOffOptionIcons,
  alarmOffOptionTextMap,
} from '../../entities/alarm';
import { alarmCardOffOptionsIconSizes } from '../../entities/components/Alarm';
import {
  isEveryWeekDay,
  shortRusWeekDays,
  sortWeekdaysFromMonday,
  WeekdayEnum,
} from '../../entities/dates';
import { Switch } from '../Switch';

import {
  AccentContainer,
  Card,
  Content,
  Controls,
  Info,
  Time,
} from './Alarm.styles';

type Props = ViewProps & {
  offOption: AlarmOffOptionEnum;
  time: string;
  repeatWeekDays: WeekdayEnum[];
  onPressEdit?: VoidFunction;
  switchValue?: boolean;
  onChangeSwitchValue?: (value: boolean) => void;
};

const Alarm: React.FC<Props> = ({
  style,
  time,
  offOption,
  repeatWeekDays,
  onPressEdit,
  switchValue,
  onChangeSwitchValue,
  ...props
}) => {
  const { IconComponent, iconName } = alarmOffOptionIcons[offOption];

  return (
    <Card style={[blockShadow1, style]} {...props}>
      <Content>
        <AccentContainer>
          <Time>{time}</Time>
        </AccentContainer>
        {repeatWeekDays.length === 0 ? (
          <Info>Без повторов</Info>
        ) : isEveryWeekDay(repeatWeekDays) ? (
          <Info>Повторяется{'\n'}каждый день</Info>
        ) : (
          <Info>
            Повторяется:{'\n'}
            {sortWeekdaysFromMonday(repeatWeekDays)
              .map((day) => shortRusWeekDays[day].toLowerCase())
              .join(', ')}
          </Info>
        )}
      </Content>
      <Content>
        <AccentContainer>
          <IconComponent
            name={iconName}
            size={alarmCardOffOptionsIconSizes[offOption]}
            color={COLORS.beige1}
          />
        </AccentContainer>
        <Info>{alarmOffOptionTextMap[offOption]}</Info>
      </Content>
      <Controls>
        <TouchableOpacity onPress={onPressEdit}>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={38}
            color={COLORS.beige1}
          />
        </TouchableOpacity>
        <Switch
          theme="darker"
          value={switchValue}
          onValueChange={onChangeSwitchValue}
        />
      </Controls>
    </Card>
  );
};

export default React.memo(Alarm);
