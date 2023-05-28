import * as React from 'react';
import { View, Platform, StatusBar } from 'react-native';

import { Heading } from '../shared/components/typography';
import { COLORS } from '../styles/colors';

const Schedule: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.darkBronze1,
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <Heading>Schedule</Heading>
    </View>
  );
};

export default Schedule;
