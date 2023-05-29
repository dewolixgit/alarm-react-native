import * as React from 'react';
import { View } from 'react-native';

import { ButtonSwitch } from '../../../../shared/components/ButtonSwitch';
import {
  AlarmOffOptionEnum,
  alarmOffOptionIcons,
  alarmOffOptionShortTextMap,
} from '../../../../shared/entities/alarm';
import { SizeEnum } from '../../../../shared/entities/size';

import {
  LabelText,
  OptionContainer,
  OptionText,
  Row,
} from './OffOption.styles';
import { OFF_OPTIONS_ORDER } from './config';

type Props = {
  value?: AlarmOffOptionEnum;
  onChangeValue?: (value: AlarmOffOptionEnum) => void;
};

export const OffOption: React.FC<Props> = ({ onChangeValue, value }) => {
  const onPressButton = (option: AlarmOffOptionEnum) => () => {
    onChangeValue?.(option);
  };

  return (
    <View>
      <OptionText>Способ выключения:</OptionText>
      <Row>
        {OFF_OPTIONS_ORDER.map((option) => (
          <OptionContainer key={option}>
            <ButtonSwitch
              value={option === value}
              onChangeValue={onPressButton(option)}
              size={SizeEnum.xxl}
              Icon={alarmOffOptionIcons[option].IconComponent}
              iconName={alarmOffOptionIcons[option].iconName}
            />
            <LabelText>{alarmOffOptionShortTextMap[option]}</LabelText>
          </OptionContainer>
        ))}
      </Row>
    </View>
  );
};
