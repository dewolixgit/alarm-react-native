import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { styled } from 'styled-components/native';

import { COLORS } from '../../styles/colors';

export const Container = styled.View`
  background-color: ${COLORS.darkBronze1};
  flex: 1;
`;

export const LogoutIcon = styled(AntDesign).attrs({
  size: 24,
  name: 'logout',
  color: COLORS.beige1,
})`
  padding-right: 16px;
`;
