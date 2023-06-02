import { Tabs } from 'expo-router';
import * as React from 'react';
import { View, Platform, StatusBar } from 'react-native';

import ContentContainer from '../../shared/components/ContentContainer';
import { Heading, StyledText } from '../../shared/components/typography';
import { AuthFieldsType } from '../../shared/entities/auth';
import { COLORS } from '../../styles/colors';

import { ChangeAuthType, Container } from './auth.styles';
import { AuthForm } from './components';

export const Auth: React.FC = () => {
  const toRegister = true;

  const onSubmit = (values: AuthFieldsType) => {
    console.log('onSubmit', values);
  };

  if (toRegister) {
    return (
      <Container>
        <AuthForm toRegister onSubmit={onSubmit} />
        <ChangeAuthType>Уже есть учётная запись</ChangeAuthType>
      </Container>
    );
  }

  return (
    <Container>
      <AuthForm toRegister={false} onSubmit={onSubmit} />
      <ChangeAuthType>Создать учётную запись</ChangeAuthType>
    </Container>
  );
};
