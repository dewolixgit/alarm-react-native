import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Button } from '../../../../shared/components/Button';
import { CenterScreenMessage } from '../../../../shared/components/CenterScreenMessage';
import { Heading } from '../../../../shared/components/typography';
import { FullContainerLoader } from '../../../../shared/components/ui';
import formatTimeColon from '../../../../shared/utils/formatTimeColon';
import { globalDisabledAlarms } from '../../../../store/global/GlobalDisabledAlarms';

import { Container, Time } from './BaseDisabler.styles';

type Props = {
  onClickDisable?: VoidFunction;
};

export const BaseDisabler: React.FC<Props> = observer(({ onClickDisable }) => {
  const date = new Date();

  return (
    <Container>
      {globalDisabledAlarms.isAdding.value ? (
        <FullContainerLoader />
      ) : (
        <>
          <Time>
            {formatTimeColon({
              minutes: date.getHours(),
              hours: date.getMinutes(),
            })}
          </Time>
          <Button title="Выключить" onPress={onClickDisable} />
        </>
      )}
    </Container>
  );
});
