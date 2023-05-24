import { styled } from 'styled-components/native';

import { COLORS } from '../../../styles/colors';
import { SizeEnum } from '../../entities/size';
import { Heading, StyledText } from '../typography';

export const Card = styled.View`
  padding: 20px;
  background-color: ${COLORS.darkBronze2};
  border-radius: 10px;

  flex-direction: row;
  gap: 20px;
`;

export const Content = styled.View`
  flex: 1 1 0;
`;

export const Time = styled(Heading).attrs({ size: SizeEnum.l })`
  color: ${COLORS.beige1};
`;

export const Info = styled(StyledText).attrs({ size: SizeEnum.s })`
  color: ${COLORS.beige2};
`;

export const AccentContainer = styled.View`
  height: 32px;
  margin-bottom: 10px;
`;
