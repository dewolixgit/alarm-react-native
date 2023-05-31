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
  repeating: boolean;
  repeatWeekDays: WeekdayEnum[];
  onPressEdit?: VoidFunction;
  switchValue?: boolean;
  onChangeSwitchValue?: (value: boolean) => void;
};

const Alarm: React.FC<Props> = ({
  style,
  time,
  offOption,
  repeating,
  repeatWeekDays,
  onPressEdit,
  switchValue,
  onChangeSwitchValue,
  ...props
}) => {
  const { IconComponent, iconName } = alarmOffOptionIcons[offOption];

  const repeatEveryDay = React.useMemo(() => {
    if (!repeating || repeatWeekDays.length === 0) {
      return false;
    }

    return isEveryWeekDay(repeatWeekDays);
  }, [repeating, repeatWeekDays]);

  return (
    <Card style={[blockShadow1, style]} {...props}>
      <Content>
        <AccentContainer>
          <Time>{time}</Time>
        </AccentContainer>
        {!repeating && <Info>Без повторов</Info>}

        {repeating && repeatWeekDays.length !== 0 && !repeatEveryDay && (
          <Info>
            Повторяется:{'\n'}
            {sortWeekdaysFromMonday(repeatWeekDays)
              .map((day) => shortRusWeekDays[day].toLowerCase())
              .join(', ')}
          </Info>
        )}

        {repeating && repeatEveryDay && (
          <Info>Повторяется{'\n'}каждый день</Info>
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
