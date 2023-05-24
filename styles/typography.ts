import { css } from 'styled-components/native';

import { SizeEnum } from '../shared/entities/size';
import {
  FontWeightEnum,
  HeadingSizeUnion,
  NunitoFontWeightUnion,
  RobotoFontWeightUnion,
  TextSizeUnion,
} from '../shared/entities/typography/client';

export const text = ({
  size = SizeEnum.m,
  weight = FontWeightEnum.regular,
}: {
  size?: TextSizeUnion;
  weight?: RobotoFontWeightUnion;
} = {}) => css`
  ${() => {
    switch (size) {
      case SizeEnum.xl:
        return 'font-size: 20px;';
      case SizeEnum.l:
        return 'font-size: 18px;';
      case SizeEnum.m:
        return 'font-size: 16px;';
      case SizeEnum.s:
        return 'font-size: 14px;';
      case SizeEnum.xs:
        return 'font-size: 12px;';
    }
  }}

  ${() => {
    switch (weight) {
      case FontWeightEnum.regular:
        return 'font-family: RobotoRegular;';
      case FontWeightEnum.medium:
        return 'font-family: RobotoMedium;';
      case FontWeightEnum.bold:
        return 'font-family: RobotoBold;';
    }
  }}
`;

export const heading = ({
  size = SizeEnum.m,
  weight = FontWeightEnum.semibold,
}: {
  size?: HeadingSizeUnion;
  weight?: NunitoFontWeightUnion;
} = {}) => css`
  ${() => {
    switch (size) {
      case SizeEnum.xl:
        return 'font-size: 36px;';
      case SizeEnum.l:
        return 'font-size: 28px;';
      case SizeEnum.m:
        return 'font-size: 24px;';
      case SizeEnum.s:
        return 'font-size: 20px;';
    }
  }}

  ${() => {
    switch (weight) {
      case FontWeightEnum.regular:
        return 'font-family: NunitoRegular;';
      case FontWeightEnum.semibold:
        return 'font-family: NunitoSemibold;';
      case FontWeightEnum.bold:
        return 'font-family: NunitoBold;';
    }
  }}
`;
