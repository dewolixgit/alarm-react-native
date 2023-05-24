import { styled } from 'styled-components/native';

import { COLORS } from '../../../styles/colors';
import { SizeEnum } from '../../entities/size';
import { FontTypeEnum, FontWeightEnum } from '../../entities/typography';
import { Typography } from '../typography';

export const StyledInput = styled.TextInput`
  background-color: ${COLORS.darkBronze2};
  color: ${COLORS.beige1};

  border-radius: 10px;
  padding: 8px 10px;
  font-size: 20px;
`;

export const InputLabel = styled(Typography).attrs({
  size: SizeEnum.m,
  weight: FontWeightEnum.regular,
  kind: FontTypeEnum.text,
})`
  color: ${COLORS.beige3};
  padding-left: 12px;
`;
