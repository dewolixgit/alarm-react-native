import styled from 'styled-components/native';

import { Heading } from '../../../../shared/components/typography';
import { SizeEnum } from '../../../../shared/entities/size';
import { COLORS } from '../../../../styles/colors';

export const Container = styled.View`
  background-color: ${COLORS.darkBronze1};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Time = styled(Heading).attrs({
  size: SizeEnum.xl,
})`
  margin-bottom: 16px;
`;
