import { styled } from 'styled-components/native';

import { text } from '../../../styles/typography';
import {
  RobotoFontWeightUnion,
  TextSizeUnion,
} from '../../entities/typography';

const StyledText = styled.Text<{
  size?: TextSizeUnion;
  weight?: RobotoFontWeightUnion;
}>`
  ${text}
`;

export default StyledText;
