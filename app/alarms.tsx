import { AntDesign } from '@expo/vector-icons';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';
import RNShake from 'react-native-shake';
import { styled } from 'styled-components/native';

import { Alarm } from '../shared/components/Alarm';
import { Button } from '../shared/components/Button';
import { ButtonSwitch } from '../shared/components/ButtonSwitch';
import Input from '../shared/components/Input/Input';
import Switch from '../shared/components/Switch/Switch';
import { Typography } from '../shared/components/typography';
import { SizeEnum } from '../shared/entities/size';
import { FontTypeEnum, FontWeightEnum } from '../shared/entities/typography';
import { ContinuousShakingDetector } from '../shared/models/ContinuousShakingDetector';
import { ValueModel } from '../shared/models/ValueModel';
import {
  default as AlarmClass,
  enableAlarm,
  getAllAlarms,
  scheduleAlarm,
  stopAlarm,
} from '../shared/nativeModules/alarmModule';
import { COLORS } from '../styles/colors';
import FONTS from '../styles/fonts';

SplashScreen.preventAutoHideAsync();

const StyledAlarm = styled(Alarm)`
  margin-bottom: 20px;
`;

const AlarmsView: React.FC = () => {
  const [myAlarm, setMyAlarm] = React.useState<AlarmClass | null>();
  const [v, setV] = React.useState(false);
  const { value: inputValue, setValue: setInputValue } = useLocalObservable(
    () => new ValueModel('')
  );
  const shakingDetector = useLocalObservable(() =>
    ContinuousShakingDetector.createDefault({
      onComplete: (detector) => {
        detector.stopDetection();
        console.log('complete');
      },
      onShake: () => {
        console.log('shake');
      },
      onInterrupt: () => {
        console.log('interrupt');
      },
    })
  );

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

  React.useEffect(() => {
    getAllAlarms()
      .then((d) => {
        console.log(d);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }, []);

  React.useEffect(() => {
    shakingDetector.startDetection();
    console.log('start detection');
  }, []);

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
      <Button
        title="create alarm"
        onPress={() => {
          const alarm = new AlarmClass({
            hour: 9,
            minutes: 3,
          });

          setMyAlarm(alarm);

          scheduleAlarm(alarm);
        }}
      />
      <Button
        title="start alarm"
        onPress={() => {
          if (myAlarm?.uid) {
            enableAlarm(myAlarm.uid);
          }
        }}
      />
      <Button
        title="stop alarm"
        onPress={() => {
          stopAlarm();
        }}
      />
      <View
        style={{
          height: 10,
        }}
      />
      <Input label="hello" value={inputValue} onChangeText={setInputValue} />
      <Typography
        kind={FontTypeEnum.heading}
        size={SizeEnum.l}
        weight={FontWeightEnum.semibold}
      >
        {shakingDetector.isCompleted
          ? 'Молодец'
          : shakingDetector.isShaking
          ? 'Тряси ещё'
          : 'Тряси'}
      </Typography>
    </View>
  );
};

const ObserverAlarmsView = observer(AlarmsView);

export default () => <ObserverAlarmsView />;
