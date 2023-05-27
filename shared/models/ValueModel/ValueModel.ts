import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_value';

/**
 * Value model, encapsulating hiding a value
 * from straightforward changing,
 * providing safe access to the value
 * and its changing in MobX context
 */
class ValueModel<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;

    makeObservable<this, PrivateFields>(this, {
      _value: observable,
      value: computed,
      setValue: action,
    });
  }

  get value(): T {
    return this._value;
  }

  setValue = <N extends T>(value: N): N => {
    return (this._value = value);
  };
}

export default ValueModel;
