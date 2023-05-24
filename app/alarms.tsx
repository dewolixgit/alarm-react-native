import { AntDesign } from '@expo/vector-icons';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Platform, StatusBar, TextInput, View, Text } from 'react-native';
import { styled } from 'styled-components/native';

import { Alarm } from '../shared/components/Alarm';
import { Button } from '../shared/components/Button';
import { ButtonSwitch } from '../shared/components/ButtonSwitch';
import Input from '../shared/components/Input/Input';
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

  const [date, setDate] = React.useState<Date | null>(new Date(1598051730000));

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setDate(selectedDate ?? null);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    if (date) {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

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
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date?.toLocaleString()}</Text>
      <Switch value={v} onValueChange={setV} />
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
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
      <Button title="asd" />
      <View
        style={{
          height: 10,
        }}
      />
      <Input label="hello" />
    </View>
  );
};

export default Alarms;
