import { styled } from 'styled-components/native';

import { COLORS } from '../../../styles/colors';
import { commonContentIndent } from '../../../styles/consts';

export default styled.View`
  flex: 1;
  padding: 0 ${commonContentIndent};
  background-color: ${COLORS.darkBronze1};
`;
