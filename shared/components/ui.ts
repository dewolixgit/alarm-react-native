import { styled } from 'styled-components/native';

import { COLORS } from '../../styles/colors';

export const FullContainerLoader = styled.ActivityIndicator.attrs({
  size: 'large',
  color: COLORS.beige1,
})`
  flex: 1;
`;
