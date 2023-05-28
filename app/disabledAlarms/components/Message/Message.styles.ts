import { styled } from 'styled-components/native';

import { Heading } from '../../../../shared/components/typography';
import { SizeEnum } from '../../../../shared/entities/size';
import { FontWeightEnum } from '../../../../shared/entities/typography';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const MessageText = styled(Heading).attrs({
  size: SizeEnum.s,
  weight: FontWeightEnum.semibold,
})`
  text-align: center;
  margin-bottom: 24px;
`;
