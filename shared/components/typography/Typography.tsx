import * as React from 'react';
import { TextProps } from 'react-native/Libraries/Text/Text';

import {
  FontTypeEnum,
  HeadingSizeUnion,
  NunitoFontWeightUnion,
  RobotoFontWeightUnion,
  TextSizeUnion,
} from '../../entities/typography';

import Heading from './Heading';
import StyledText from './StyledText';

type Props = TextProps &
  (
    | {
        kind: FontTypeEnum.text;
        size: TextSizeUnion;
        weight: RobotoFontWeightUnion;
      }
    | {
        kind: FontTypeEnum.heading;
        size: HeadingSizeUnion;
        weight: NunitoFontWeightUnion;
      }
  );

const Typography: React.FC<Props> = ({ children, ...props }) => {
  if (props.kind === FontTypeEnum.heading) {
    return <Heading {...props}>{children}</Heading>;
  }

  return <StyledText {...props}>{children}</StyledText>;
};

export default Typography;
