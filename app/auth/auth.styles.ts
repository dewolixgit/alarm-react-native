import { styled } from 'styled-components/native';

import ContentContainer from '../../shared/components/ContentContainer';
import { StyledText } from '../../shared/components/typography';
import { COLORS } from '../../styles/colors';

export const Container = styled(ContentContainer)`
  justify-content: center;
`;

export const ChangeAuthType = styled(StyledText)`
  margin-top: 48px;
  text-align: center;
  color: ${COLORS.beige3};
`;
