import { useRouter } from 'expo-router';
import * as React from 'react';

import { Button } from '../../../../shared/components/Button';
import { AuthRouteParamsType } from '../../../../shared/entities/screens/auth';

import { Container, MessageText } from './Message.styles';

export const Message: React.FC = () => {
  const { push } = useRouter();

  const onPress = React.useCallback(() => {
    push({
      pathname: 'auth',
      params: {
        goBackRoute: 'disabledAlarms',
      } as AuthRouteParamsType,
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
