import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { styled } from 'styled-components/native';

import { Alarm } from '../shared/components/Alarm';
import { ButtonSwitch } from '../shared/components/RoundButton';
import Switch from '../shared/components/Switch/Switch';
import { SizeEnum } from '../shared/entities/size';
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
      <ButtonSwitch value={v} onChangeValue={setV} text="abc" />
      <ButtonSwitch
        value={v}
        onChangeValue={setV}
        text="abc"
        size={SizeEnum.xxl}
      />
      <ButtonSwitch
        value={v}
        onChangeValue={setV}
        Icon={AntDesign}
        iconName="shake"
      />
      <ButtonSwitch
        value={v}
        onChangeValue={setV}
        Icon={AntDesign}
        iconName="shake"
        size={SizeEnum.xxl}
      />
    </View>
  );
};

export default Alarms;
