import styled from 'styled-components/native';

import { Button } from '../../../../shared/components/Button';
import { CenterScreenMessage } from '../../../../shared/components/CenterScreenMessage';
import { COLORS } from '../../../../styles/colors';
import { commonContentIndent } from '../../../../styles/consts';

export const Container = styled.View`
  background-color: ${COLORS.darkBronze1};
  flex: 1;
`;

export const ButtonWrapper = styled.View`
  margin: 0 ${commonContentIndent} 16px;
`;
