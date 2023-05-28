import randomInRange from '../../utils/randomInRange';
import range from '../../utils/range';
import { ValueModel } from '../ValueModel';

type SumTaskModelParams = {
  termsCount: number;
  minTermValue: number;
  maxTermValue: number;
};

export class SumTaskModel {
  /**
   * null - if not initialized
   */
  readonly terms = new ValueModel<number[] | null>(null);

  readonly termsCount: number;
  readonly minTermValue: number;
  readonly maxTermValue: number;

  constructor(params: SumTaskModelParams) {
    this.termsCount = params.termsCount;
    this.minTermValue = params.minTermValue;
    this.maxTermValue = params.maxTermValue;
  }

  get answer(): null | number {
    const terms = this.terms.value;

    if (terms === null) {
      return null;
    }

    return terms.reduce((sum, value) => sum + value, 0);
  }

  private _randomizeTermValue = (): number => {
    return randomInRange(this.minTermValue, this.maxTermValue);
  };

  private _fillTermsWithRandomValues = (): number[] => {
    return range(this.termsCount).map(this._randomizeTermValue);
  };

  initTask = (): number[] => {
    return this.terms.setValue(this._fillTermsWithRandomValues());
  };

  /**
   * null – if model wasn't initialized
   */
  checkAnswer = (userAnswer: number): null | boolean => {
    if (this.terms.value === null) {
      return null;
    }

    return userAnswer === this.answer;
  };

  static createDefault(): SumTaskModel {
    return new SumTaskModel({
      termsCount: 2,
      minTermValue: 10,
      maxTermValue: 50,
    });
  }
}
