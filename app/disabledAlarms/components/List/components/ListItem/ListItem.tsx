import * as React from 'react';
import { StyleProp, View } from 'react-native';

import { Heading } from '../../../../../../shared/components/typography';
import { SizeEnum } from '../../../../../../shared/entities/size';
import { DisabledAlarmType } from '../../types';

import { Container, OffOptionText, TextContainer } from './ListItem.styles';
import { alarmDisabledText } from './config';

type Props = {
  alarm: DisabledAlarmType;
  style?: StyleProp<any>;
  isLastInList?: boolean;
};

export const ListItem: React.FC<Props> = React.memo(
  ({ alarm, style, isLastInList = false }) => {
    return (
      <Container hideBorderBottom={isLastInList} style={style}>
        <View>
          <Heading size={SizeEnum.l}>{alarm.timeString}</Heading>
        </View>
        <TextContainer>
          <OffOptionText>{alarmDisabledText[alarm.offOption]}</OffOptionText>
        </TextContainer>
      </Container>
    );
  }
);
