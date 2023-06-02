import { Tabs } from 'expo-router';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import ContentContainer from '../../shared/components/ContentContainer';
import { userStore } from '../../store/global/UserStore';

import { Message } from './components';
import { List } from './components/List';
import { Container, LogoutIcon } from './disabledAlarms.styles';

export const DisabledAlarms: React.FC = observer(() => {
  if (!userStore.isAuthorized) {
    return (
      <ContentContainer>
        <Message />
      </ContentContainer>
    );
  }

  return (
    <>
      <Tabs.Screen
        options={{
          headerRight: () => <LogoutIcon onPress={userStore.logout} />,
        }}
      />
      <Container>
        <List />
      </Container>
    </>
  );
});
