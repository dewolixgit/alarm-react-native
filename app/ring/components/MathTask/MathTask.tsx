import { useRouter } from 'expo-router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';

import { Button } from '../../../../shared/components/Button';
import { Input } from '../../../../shared/components/Input';
import AlarmClass from '../../../../shared/nativeModules/alarmModule';
import { RingMathTaskStore } from '../../../../store/local/RingMathTaskStore';

import {
  ButtonWrapper,
  CenterContainer,
  Container,
  TaskText,
} from './MathTask.styles';

type Props = {
  alarm: AlarmClass;
};

export const MathTask: React.FC<Props> = observer(({ alarm }) => {
  const { push } = useRouter();
  const taskStore = useLocalObservable(() => new RingMathTaskStore(alarm));

  const onPressFinish = React.useCallback(async () => {
    const result = await taskStore.finishTask();

    if (result) {
      push({
        pathname: 'alarms',
      });
    }
  }, [taskStore.finishTask]);

  const onChangeText = React.useCallback((text: string) => {
    taskStore.invalidAnswer.setValue(false);
    taskStore.userAnswer.setValue(text);
  }, []);

  return (
    <Container>
      <CenterContainer>
        <TaskText>{taskStore.math.terms.value?.join(' + ')}</TaskText>
        <Input
          keyboardType="numeric"
          incorrect={taskStore.invalidAnswer.value}
          value={taskStore.userAnswer.value}
          onChangeText={onChangeText}
        />
      </CenterContainer>
      <ButtonWrapper>
        <Button title="Завершить" onPress={onPressFinish} />
      </ButtonWrapper>
    </Container>
  );
});
