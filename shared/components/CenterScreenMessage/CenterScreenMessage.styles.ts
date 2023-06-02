import { styled } from 'styled-components/native';

import { SizeEnum } from '../../entities/size';
import ContentContainer from '../ContentContainer/ContentContainer';
import { Heading } from '../typography';

export const MessageContainer = styled(ContentContainer)`
  justify-content: center;
  align-items: center;
`;

export const Message = styled(Heading).attrs({
  size: SizeEnum.s,
})`
  text-align: center;
`;
