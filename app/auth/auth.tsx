import { useFocusEffect, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { FullContainerLoader } from '../../shared/components/ui';
import { AuthFieldsType } from '../../shared/entities/auth';
import { AuthRouteParamsType } from '../../shared/entities/screens/auth';
import { RingScreenRouteParamsType } from '../../shared/entities/screens/ring';
import { getAlarmState } from '../../shared/nativeModules/alarmModule';
import useFocus from '../../shared/utils/useFocus';
import { checkActiveAlarmStore } from '../../store/global/CheckActiveAlarmStore';
import { uiStore } from '../../store/global/UIStore';
import { userStore } from '../../store/global/UserStore';

import { ChangeAuthType, Container } from './auth.styles';
import { AuthForm } from './components';

export const Auth: React.FC = observer(() => {
  const { push } = useRouter();
  const { goBackRoute } = useSearchParams<AuthRouteParamsType>();
  const [toRegister, setToRegister] = React.useState(true);

  const { inFocus } = useFocus();

  const changeAuthType = React.useCallback(
    () => setToRegister((prev) => !prev),
    []
  );

  const onSubmit = React.useCallback(
    async (values: AuthFieldsType) => {
      if (toRegister) {
        const result = await userStore.register(values);
        if (result) {
          setToRegister(false);
        }
        return;
      }

      const result = await userStore.login(values);

      if (result && goBackRoute) {
        push({
          pathname: goBackRoute,
        });
      }
    },
    [userStore, toRegister]
  );

  if (!inFocus) {
    return null;
  }

  if (toRegister) {
    return (
      <Container>
        <AuthForm
          key={1}
          toRegister
          onSubmit={onSubmit}
          disabled={userStore.authLoading.value}
        />
        <ChangeAuthType
          onPress={userStore.authLoading.value ? undefined : changeAuthType}
        >
          Уже есть учётная запись
        </ChangeAuthType>
      </Container>
    );
  }

  return (
    <Container>
      <AuthForm
        key={2}
        toRegister={false}
        onSubmit={onSubmit}
        disabled={userStore.authLoading.value}
      />
      <ChangeAuthType
        onPress={userStore.authLoading.value ? undefined : changeAuthType}
      >
        Создать учётную запись
      </ChangeAuthType>
    </Container>
  );
});
