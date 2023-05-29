import { styled } from 'styled-components/native';

import { StyledText } from '../../../../shared/components/typography';
import { SizeEnum } from '../../../../shared/entities/size';
import { COLORS } from '../../../../styles/colors';

export const OptionText = styled(StyledText).attrs({
  size: SizeEnum.l,
})`
  margin-bottom: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

export const OptionContainer = styled.View`
  align-items: center;
  gap: 8px;
`;

export const LabelText = styled(StyledText).attrs({
  size: SizeEnum.s,
})`
  color: ${COLORS.beige3};
  text-align: center;
`;
