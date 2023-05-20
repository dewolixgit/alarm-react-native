import { styled } from 'styled-components/native';

import { heading } from '../../../styles/typography';
import {
  HeadingSizeUnion,
  NunitoFontWeightUnion,
} from '../../entities/typography';

const Heading = styled.Text<{
  size?: HeadingSizeUnion;
  weight?: NunitoFontWeightUnion;
}>`
  ${heading}
`;

export default Heading;
