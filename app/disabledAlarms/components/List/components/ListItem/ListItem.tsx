import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { StyleProp, TouchableOpacity, View } from 'react-native';

import { Heading } from '../../../../../../shared/components/typography';
import { FullContainerLoader } from '../../../../../../shared/components/ui';
import { DisabledAlarmType } from '../../../../../../shared/entities/disabledAlarm';
import { SizeEnum } from '../../../../../../shared/entities/size';
import { useDisabledAlarmsStore } from '../../../../../../store/local/DisabledAlarmsStore';

import {
  Container,
  DeleteIcon,
  DeleteIconContainer,
  OffOptionText,
  TextContainer,
  TimeContainer,
} from './ListItem.styles';
import { alarmDisabledText } from './config';

type Props = {
  alarm: DisabledAlarmType;
  style?: StyleProp<any>;
  isLastInList?: boolean;
};

export const ListItem: React.FC<Props> = observer(
  ({ alarm, style, isLastInList = false }) => {
    const disabledAlarmsStore = useDisabledAlarmsStore();

    const onClickDelete = React.useCallback(async () => {
      if (!disabledAlarmsStore) {
        return;
      }

      const result = await disabledAlarmsStore.deleteDisabledAlarm(alarm.id);

      if (result) {
        await disabledAlarmsStore.init();
      }
    }, [disabledAlarmsStore, alarm.id]);

    if (!disabledAlarmsStore) {
      return null;
    }

    return (
      <Container hideBorderBottom={isLastInList} style={style}>
        {disabledAlarmsStore.isDeleting.value ? (
          <FullContainerLoader />
        ) : (
          <>
            <TimeContainer>
              <Heading size={SizeEnum.l}>{alarm.timeString}</Heading>
            </TimeContainer>
            <TextContainer>
              <OffOptionText>
                {alarmDisabledText[alarm.offOption]}
              </OffOptionText>
            </TextContainer>
            <DeleteIconContainer onPress={onClickDelete}>
              <DeleteIcon />
            </DeleteIconContainer>
          </>
        )}
      </Container>
    );
  }
);
