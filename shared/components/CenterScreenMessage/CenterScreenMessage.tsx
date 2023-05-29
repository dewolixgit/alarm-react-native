import * as React from 'react';

import { Message, MessageContainer } from './CenterScreenMessage.styles';

type Props = {
  children?: React.ReactNode;
};

const CenterScreenMessage: React.FC<Props> = ({ children }) => {
  return (
    <MessageContainer>
      <Message>{children}</Message>
    </MessageContainer>
  );
};

export default React.memo(CenterScreenMessage);
