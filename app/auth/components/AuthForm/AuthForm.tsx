import * as React from 'react';

import { Button } from '../../../../shared/components/Button';
import { AuthFieldsType } from '../../../../shared/entities/auth';

import { StyledInput } from './AuthForm.styles';

type Props = {
  onSubmit?: (values: AuthFieldsType) => void;
  toRegister?: boolean;
};

export const AuthForm: React.FC<Props> = React.memo(
  ({ onSubmit, toRegister }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onPress = React.useCallback(() => {
      onSubmit?.({
        email,
        password,
      });
    }, [email, password, onSubmit]);

    return (
      <>
        <StyledInput label="Email" value={email} onChangeText={setEmail} />
        <StyledInput
          label="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title={toRegister ? 'Зарегистрироваться' : 'Войти'}
          onPress={onPress}
        />
      </>
    );
  }
);
