import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';
import { styled } from 'styled-components/native';

import { Alarm } from '../shared/components/Alarm';
import Switch from '../shared/components/Switch/Switch';
import { AlarmOffOptionEnum } from '../shared/entities/alarm';
import { WeekdayEnum } from '../shared/entities/dates';
import { COLORS } from '../styles/colors';
import FONTS from '../styles/fonts';

SplashScreen.preventAutoHideAsync();

const StyledAlarm = styled(Alarm)`
  margin-bottom: 20px;
`;

const Alarms: React.FC = () => {
  const [v, setV] = React.useState(false);

  // Todo: Перенести в корневой компонент, определяющий рендерить главную страницу или экран выключения
  const [fontsLoaded] = useFonts(FONTS);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        backgroundColor: COLORS.darkBronze1,
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <Switch value={v} onValueChange={setV} />
    </View>
  );
};

export default Alarms;
