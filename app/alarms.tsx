import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';
import { styled } from 'styled-components/native';

import { Alarm } from '../shared/components/Alarm';
import { AlarmOffOptionEnum } from '../shared/entities/alarm';
import { WeekdayEnum } from '../shared/entities/dates';
import { COLORS } from '../styles/colors';
import FONTS from '../styles/fonts';

SplashScreen.preventAutoHideAsync();

const StyledAlarm = styled(Alarm)`
  margin-bottom: 20px;
`;

const Alarms: React.FC = () => {
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
      <Text>Hello</Text>
      <StyledAlarm
        time="04:50"
        offOption={AlarmOffOptionEnum.shake}
        repeatWeekDays={[
          WeekdayEnum.friday,
          WeekdayEnum.tuesday,
          WeekdayEnum.thursday,
        ]}
      />
      <StyledAlarm
        time="08:00"
        offOption={AlarmOffOptionEnum.math}
        repeatWeekDays={[
          WeekdayEnum.monday,
          WeekdayEnum.tuesday,
          WeekdayEnum.wednesday,
          WeekdayEnum.thursday,
          WeekdayEnum.friday,
          WeekdayEnum.saturday,
        ]}
      />
      <Alarm
        time="05:00"
        offOption={AlarmOffOptionEnum.gesture}
        repeatWeekDays={[
          WeekdayEnum.monday,
          WeekdayEnum.tuesday,
          WeekdayEnum.wednesday,
          WeekdayEnum.thursday,
          WeekdayEnum.friday,
          WeekdayEnum.saturday,
          WeekdayEnum.sunday,
        ]}
      />
    </View>
  );
};

export default Alarms;
