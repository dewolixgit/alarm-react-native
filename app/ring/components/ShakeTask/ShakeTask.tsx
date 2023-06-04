import { useRouter } from 'expo-router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';

import { Button } from '../../../../shared/components/Button';
import { CenterScreenMessage } from '../../../../shared/components/CenterScreenMessage';
import { FullContainerLoader } from '../../../../shared/components/ui';
import { ContinuousShakingDetector } from '../../../../shared/models/ContinuousShakingDetector';
import AlarmClass from '../../../../shared/nativeModules/alarmModule';
import { globalDisabledAlarms } from '../../../../store/global/GlobalDisabledAlarms';

import { ButtonWrapper, Container } from './ShakeTask.styles';

type Props = {
  alarm: AlarmClass;
};

export const ShakeTask: React.FC<Props> = observer(({ alarm }) => {
  const { push } = useRouter();

  const shakingDetector = useLocalObservable(() =>
    ContinuousShakingDetector.createDefault()
  );

  const onClickFinish = React.useCallback(async () => {
    await globalDisabledAlarms.handleAddDisabledAlarm({
      hours: alarm.hour,
      minutes: alarm.minutes,
      offOption: alarm.offOption,
    });

    push({
      pathname: 'alarms',
    });
  }, [alarm]);

  React.useEffect(() => {
    shakingDetector.startDetection();

    return () => {
      shakingDetector.stopDetection();
    };
  }, [shakingDetector]);

  return (
    <Container>
      {globalDisabledAlarms.isAdding.value ? (
        <FullContainerLoader />
      ) : (
        <>
          <CenterScreenMessage>
            {!shakingDetector.isCompleted &&
              !shakingDetector.isShaking &&
              'Трясите устройство на протяжении пяти секунд'}

            {!shakingDetector.isCompleted &&
              shakingDetector.isShaking &&
              'Продолжайте трясти'}

            {shakingDetector.isCompleted && 'Вы можете закрыть экран'}
          </CenterScreenMessage>
          {shakingDetector.isCompleted && (
            <ButtonWrapper>
              <Button title="Завершить" onPress={onClickFinish} />
            </ButtonWrapper>
          )}
        </>
      )}
    </Container>
  );
});
