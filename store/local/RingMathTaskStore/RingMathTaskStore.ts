import { computed, makeObservable } from 'mobx';

import { SumTaskModel } from '../../../shared/models/SumTaskModel';
import { ValueModel } from '../../../shared/models/ValueModel';
import AlarmClass from '../../../shared/nativeModules/alarmModule';

export class RingMathTaskStore {
  readonly alarm: AlarmClass;

  readonly userAnswer = new ValueModel('');

  readonly invalidAnswer = new ValueModel(false);

  readonly math: SumTaskModel;

  constructor(alarm: AlarmClass) {
    this.alarm = alarm;
    this.math = SumTaskModel.createDefault();
    this.math.initTask();

    makeObservable(this, {
      numberUserAnswer: computed,
    });
  }

  get numberUserAnswer(): number | null {
    const number = Number(this.userAnswer.value);

    if (isNaN(number) || this.userAnswer.value === '') {
      return null;
    }

    return number;
  }

  finishTask = async (): Promise<boolean> => {
    if (
      this.numberUserAnswer === null ||
      !this.math.checkAnswer(this.numberUserAnswer)
    ) {
      this.invalidAnswer.setValue(true);
      return false;
    }

    return true;
  };
}
