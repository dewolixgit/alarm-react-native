import { Icon } from '@expo/vector-icons/build/createIconSet';
import * as React from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';

import { COLORS } from '../../../styles/colors';
import { blockShadow1 } from '../../../styles/mixins';
import {
  buttonSwitchIconSizes,
  ButtonSwitchSizesUnion,
} from '../../entities/components/ButtonSwitch';
import { SizeEnum } from '../../entities/size';

import { Container, StyledText } from './ButtonSwitch.styles';

type Props = ViewProps & {
  size?: ButtonSwitchSizesUnion;
  text?: string;
  Icon?: Icon<any, any>;
  iconName?: string;
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
};

const ButtonSwitch: React.FC<Props> = ({
  style,
  size = SizeEnum.m,
  text,
  Icon,
  iconName,
  value,
  onChangeValue,
  ...props
}) => {
  const onPress = React.useCallback(() => {
    if (value !== undefined && onChangeValue) {
      onChangeValue(!value);
    }
  }, [onChangeValue, value]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Container
        size={size}
        style={[blockShadow1, style]}
        active={value}
        {...props}
      >
        {text && (
          <StyledText
            size={size}
            active={value}
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
            }}
          >
            {text}
          </StyledText>
        )}

        {iconName && Icon && (
          <Icon
            name={iconName}
            size={buttonSwitchIconSizes[size]}
            color={value ? COLORS.darkBronze2 : COLORS.beige1}
            style={{
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}
          />
        )}
      </Container>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonSwitch);
