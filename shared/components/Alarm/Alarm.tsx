import * as React from 'react';
import { ViewProps } from 'react-native';

import { COLORS } from '../../../styles/colors';
import { blockShadow1 } from '../../../styles/mixins';
import { AlarmOffOptionEnum, alarmOffOptionIcons } from '../../entities/alarm';
import { alarmCardOffOptionsIconSizes } from '../../entities/components/Alarm';
import {
  isEveryWeekDay,
  shortRusWeekDays,
  sortWeekdaysFromMonday,
  WeekdayEnum,
} from '../../entities/dates';

import { AccentContainer, Card, Content, Info, Time } from './Alarm.styles';

type Props = ViewProps & {
  offOption: AlarmOffOptionEnum;
  time: string;
  repeatWeekDays: WeekdayEnum[];
};

const Alarm: React.FC<Props> = ({
  style,
  time,
  offOption,
  repeatWeekDays,
  ...props
}) => {
  const { IconComponent, iconName } = alarmOffOptionIcons[offOption];

  return (
    <Card style={[blockShadow1, style]} {...props}>
      <Content>
        <AccentContainer>
          <Time>{time}</Time>
        </AccentContainer>
        {isEveryWeekDay(repeatWeekDays) ? (
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
        <Info>Выключается жестом</Info>
      </Content>
    </Card>
  );
};

export default React.memo(Alarm);
