import { useRouter } from 'expo-router';
import * as React from 'react';

import { Button } from '../../../../shared/components/Button';
import { Typography } from '../../../../shared/components/typography';
import { SizeEnum } from '../../../../shared/entities/size';
import {
  FontTypeEnum,
  FontWeightEnum,
} from '../../../../shared/entities/typography';

import { Container, MessageText } from './Message.styles';

export const Message: React.FC = () => {
  const { push } = useRouter();

  const onPress = React.useCallback(() => {
    push({
      pathname: 'auth',
    });
  }, []);

  return (
    <Container>
      <MessageText>
        Чтобы видеть статистику выключенных будильников, нужно войти в учётную
        запись
      </MessageText>
      <Button title="Войти" onPress={onPress} />
    </Container>
  );
};
