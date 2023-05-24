import { styled } from 'styled-components/native';

import { COLORS } from '../../../styles/colors';
import { text } from '../../../styles/typography';
import {
  RobotoFontWeightUnion,
  TextSizeUnion,
} from '../../entities/typography';

const StyledText = styled.Text<{
  size?: TextSizeUnion;
  weight?: RobotoFontWeightUnion;
}>`
  ${text};
  color: ${COLORS.beige1};
`;

export default StyledText;
