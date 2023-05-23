import { css, styled } from 'styled-components/native';

import { COLORS } from '../../../styles/colors';
import { roundBorderRadius, square } from '../../../styles/mixins';
import {
  buttonSwitchSizes,
  ButtonSwitchSizesUnion,
  buttonSwitchTextSizes,
} from '../../entities/components/ButtonSwitch';
import { SizeEnum } from '../../entities/size';

export const Container = styled.View<{
  size?: ButtonSwitchSizesUnion;
  active?: boolean;
}>`
  ${({ size = SizeEnum.m }) => css`
    ${square(`${buttonSwitchSizes[size]}px`)}
    ${roundBorderRadius(buttonSwitchSizes[size])}
  `};

  background-color: ${({ active = false }) =>
    active ? COLORS.beige1 : COLORS.darkBronze2};

  color: ${({ active = false }) =>
    active ? COLORS.darkBronze2 : COLORS.beige1};
`;

export const StyledText = styled.Text<{
  size?: ButtonSwitchSizesUnion;
  active?: boolean;
}>`
  flex: 1;
  font-family: RobotoMedium;

  font-size: ${({ size = SizeEnum.m }) => `${buttonSwitchTextSizes[size]}px`};

  color: ${({ active = false }) =>
    active ? COLORS.darkBronze2 : COLORS.beige1};
`;
