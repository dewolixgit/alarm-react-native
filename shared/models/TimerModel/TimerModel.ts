import { computed, makeObservable } from 'mobx';

import { ValueModel } from '../ValueModel';

export class TimerModel {
  private readonly _instance = new ValueModel<NodeJS.Timer | null>(null);

  private readonly _isActive = new ValueModel(false);

  private readonly _isCompleted = new ValueModel(false);

  constructor() {
    makeObservable(this, {
      isActive: computed,
      isCompleted: computed,
    });
  }

  get isActive(): boolean {
    return this._isActive.value;
  }

  get isCompleted(): boolean {
    return this._isCompleted.value;
  }

  private _onComplete = () => {
    this._isActive.setValue(false);
    this._isCompleted.setValue(true);
  };

  start = <Args extends any[]>(
    handler: (...args: Args) => void,
    timeout?: number,
    ...args: Args
  ) => {
    this.resetState();
    this._isActive.setValue(true);

    this._instance.setValue(
      setTimeout(
        (...handlerArgs) => {
          this._onComplete();
          handler(...handlerArgs);
        },
        timeout,
        ...args
      )
    );
  };

  stop = (): void => {
    if (this._instance.value) {
      clearTimeout(this._instance.value);
      this._instance.setValue(null);
      this._isActive.setValue(false);
    }
  };

  resetState = () => {
    this.stop();
    this._isActive.setValue(false);
    this._isCompleted.setValue(false);
  };
}
