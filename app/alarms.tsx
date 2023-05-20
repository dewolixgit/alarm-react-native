import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { styled } from 'styled-components/native';

import { Typography } from '../shared/components/typography';
import { SizeEnum } from '../shared/entities/size';
import {
  FontTypeEnum,
  FontWeightEnum,
} from '../shared/entities/typography/client';
import { COLORS } from '../styles/colors';
import FONTS from '../styles/fonts';

SplashScreen.preventAutoHideAsync();

const StyledText = styled(Typography)`
  padding-top: 40px;
`;

const StyledTwoText = styled(StyledText)`
  margin: 10px 0;
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
      }}
    >
      <StyledText
        kind={FontTypeEnum.text}
        size={SizeEnum.xl}
        weight={FontWeightEnum.bold}
      >
        Alarms
      </StyledText>
    </View>
  );
};

export default Alarms;
