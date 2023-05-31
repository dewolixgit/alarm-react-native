import * as React from 'react';

import { Button } from '../../../../shared/components/Button';
import { CenterScreenMessage } from '../../../../shared/components/CenterScreenMessage';
import { Heading } from '../../../../shared/components/typography';
import formatTimeColon from '../../../../shared/utils/formatTimeColon';

import { Container, Time } from './BaseDisabler.styles';

type Props = {
  onClickDisable?: VoidFunction;
};

export const BaseDisabler: React.FC<Props> = React.memo(
  ({ onClickDisable }) => {
    const date = new Date();

    return (
      <Container>
        <Time>
          {formatTimeColon({
            minutes: date.getHours(),
            hours: date.getMinutes(),
          })}
        </Time>
        <Button title="Выключить" onPress={onClickDisable} />
      </Container>
    );
  }
);
