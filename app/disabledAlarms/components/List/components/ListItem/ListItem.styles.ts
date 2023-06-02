import { styled } from 'styled-components/native';

import { StyledText } from '../../../../../../shared/components/typography';
import { SizeEnum } from '../../../../../../shared/entities/size';
import { COLORS } from '../../../../../../styles/colors';

export const Container = styled.View<{ hideBorderBottom?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 60px;

  padding: 14px 0;
  border-bottom-color: ${COLORS.beige3};

  border-bottom-width: ${({ hideBorderBottom = false }) =>
    hideBorderBottom ? 0 : '1px'};
`;

export const OffOptionText = styled(StyledText).attrs({
  size: SizeEnum.s,
})`
  color: ${COLORS.beige3};
`;

export const TextContainer = styled.View`
  flex-shrink: 1;
`;
