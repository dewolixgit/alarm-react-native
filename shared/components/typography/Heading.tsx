import { styled } from 'styled-components/native';

import { COLORS } from '../../../styles/colors';
import { heading } from '../../../styles/typography';
import {
  HeadingSizeUnion,
  NunitoFontWeightUnion,
} from '../../entities/typography';

const Heading = styled.Text<{
  size?: HeadingSizeUnion;
  weight?: NunitoFontWeightUnion;
}>`
  ${heading};
  color: ${COLORS.beige1};
`;

export default Heading;
