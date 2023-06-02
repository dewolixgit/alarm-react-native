import { Text } from 'react-native';
import { styled } from 'styled-components/native';

import { COLORS } from '../../../../styles/colors';

export const Container = styled.View`
  height: 200px;
  align-items: center;
  justify-content: center;
`;

export const Time = styled(Text)`
  font-family: 'NunitoSemibold';
  font-size: 86px;
  text-align: center;
  color: ${COLORS.beige1};
`;
