import { css } from 'styled-components/native';

import { COLORS } from './colors';

export const blockShadow1 = {
  elevation: 5,
  shadowColor: COLORS.transparentBlack25,
};

export const square = (size: string) => css`
  width: ${size};
  height: ${size};
`;

export const roundBorderRadius = (sideSize: number, measurement = 'px') => css`
  border-radius: ${sideSize / 2}${measurement};
`;
