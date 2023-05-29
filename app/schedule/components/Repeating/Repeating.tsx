import * as React from 'react';
import { View } from 'react-native';

import { ButtonSwitch } from '../../../../shared/components/ButtonSwitch';
import { Switch } from '../../../../shared/components/Switch';
import { StyledText } from '../../../../shared/components/typography';
import {
  shortRusWeekDays,
  WEEK_DAYS_ORDER,
  WeekdayEnum,
} from '../../../../shared/entities/dates';

import {
  Container,
  FirstRow,
  SecondRow,
  ToRepeatText,
} from './Repeating.styles';

type Props = {
  toRepeat?: boolean;
  days?: WeekdayEnum[];
  onChangeToRepeat?: (value: boolean) => void;
  onChangeDays?: (value: WeekdayEnum[]) => void;
};

// Sorry, there is some array search, but i'm in hurry
export const Repeating: React.FC<Props> = React.memo(
  ({ toRepeat, days, onChangeDays, onChangeToRepeat }) => {
    const onClickDay = (day: WeekdayEnum) => (toAddDay: boolean) => {
      if (!days || !onChangeDays) {
        return;
      }

      const set = new Set(days);

      if (toAddDay) {
        set.add(day);
        onChangeDays(Array.from(set.values()));
        return;
      }

      set.delete(day);
      onChangeDays(Array.from(set.values()));
    };

    return (
      <Container>
        <FirstRow>
          <ToRepeatText>Повторять:</ToRepeatText>
          <Switch onValueChange={onChangeToRepeat} value={toRepeat} />
        </FirstRow>
        <SecondRow>
          {WEEK_DAYS_ORDER.map((day) => (
            <ButtonSwitch
              key={day}
              text={shortRusWeekDays[day]}
              disabled={!toRepeat}
              value={days?.includes(day)}
              onChangeValue={onClickDay(day)}
            />
          ))}
        </SecondRow>
      </Container>
    );
  }
);
