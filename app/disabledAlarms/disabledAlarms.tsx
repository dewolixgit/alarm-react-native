import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import * as React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import { Button } from '../../shared/components/Button';
import ContentContainer from '../../shared/components/ContentContainer';
import { Typography } from '../../shared/components/typography';
import { SizeEnum } from '../../shared/entities/size';
import { FontTypeEnum, FontWeightEnum } from '../../shared/entities/typography';
import { COLORS } from '../../styles/colors';

import { Message } from './components';
import { List } from './components/List';
import { Container, LogoutIcon } from './disabledAlarms.styles';

export const DisabledAlarms: React.FC = () => {
  const authenticated = true;

  const onPressLogout = React.useCallback(() => {
    console.log('logout');
  }, []);

  if (!authenticated) {
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
          headerRight: () => <LogoutIcon onPress={onPressLogout} />,
        }}
      />
      <Container>
        <List />
      </Container>
    </>
  );
};
