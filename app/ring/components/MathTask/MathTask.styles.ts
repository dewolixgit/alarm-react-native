import styled from 'styled-components/native';

import { Heading } from '../../../../shared/components/typography';
import { SizeEnum } from '../../../../shared/entities/size';
import { COLORS } from '../../../../styles/colors';
import { commonContentIndent } from '../../../../styles/consts';

export const Container = styled.View`
  background-color: ${COLORS.darkBronze1};
  flex: 1;
`;

export const CenterContainer = styled.View`
  padding: 0 ${commonContentIndent};
  flex: 1;
  justify-content: center;
`;

export const TaskText = styled(Heading).attrs({
  size: SizeEnum.xl,
})`
  text-align: center;
  margin-bottom: 16px;
`;

export const ButtonWrapper = styled.View`
  margin: 0 ${commonContentIndent} 16px;
`;
