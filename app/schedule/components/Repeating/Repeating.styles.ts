import { styled } from 'styled-components/native';

import { StyledText } from '../../../../shared/components/typography';
import { SizeEnum } from '../../../../shared/entities/size';

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const FirstRow = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const ToRepeatText = styled(StyledText).attrs({
  size: SizeEnum.l,
})`
  margin-bottom: 16px;
`;

export const SecondRow = styled.View`
  flex-direction: row;
  gap: 4px;
  justify-content: space-between;
`;
