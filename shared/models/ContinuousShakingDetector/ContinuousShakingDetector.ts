import { computed, makeObservable } from 'mobx';
import { EmitterSubscription } from 'react-native/Libraries/vendor/emitter/EventEmitter';
import RNShake from 'react-native-shake';

import { TimerModel } from '../TimerModel';
import { ValueModel } from '../ValueModel';

export type ContinuousShakingDetectorParamsType = {
  /**
   * For what time in ms should the detector
   * wait while shaking until fire a complete event
   */
  durationMS: number;

  /**
   * An interval to check is a user actually shaking a device
   */
  checkIntervalMs: number;

  /**
   * An event fired when a device was shaken for target duration
   */
  onComplete: null | ((instance: ContinuousShakingDetector) => void);

  /**
   * An event fired when shaking was stopped
   */
  onInterrupt: null | ((instance: ContinuousShakingDetector) => void);

  /**
   * An event fired when shaking
   */
  onShake: null | ((instance: ContinuousShakingDetector) => void);
};

/**
 * Watches if shaking is continuing for a certain time.
 * On every shake event start/restart a timer
 * of a shaking corruption event that means
 * resetting complete event timer.
 * If an interruption hasn't been triggered
 * for the certain time, the complete event
 * will be fired
 */
export class ContinuousShakingDetector {
  /**
   * Configured from outside
   */
  readonly durationMS: number;

  /**
   * Configured from outside
   */
  readonly checkIntervalMs: number;

  /**
   * Configured from outside
   */
  private readonly _passedOnComplete:
    | null
    | ((instance: ContinuousShakingDetector) => void);

  /**
   * Configured from outside
   */
  private readonly _passedOnInterrupt:
    | null
    | ((instance: ContinuousShakingDetector) => void);

  /**
   * Configured from outside
   */
  private readonly _passedOnShake:
    | null
    | ((instance: ContinuousShakingDetector) => void);

  /**
   * Is a device currently shaking.
   * Is null if shaking detection isn't active
   */
  private readonly _isShaking = new ValueModel<boolean | null>(null);

  private readonly _detectionIsActive = new ValueModel(false);

  private readonly _isCompleted = new ValueModel(false);

  private readonly _shakingDetectorEmitter =
    new ValueModel<EmitterSubscription | null>(null);

  private readonly _checkingTimer = new TimerModel();

  private readonly _completeTimer = new TimerModel();

  constructor(params: ContinuousShakingDetectorParamsType) {
    this.durationMS = params.durationMS;
    this.checkIntervalMs = params.checkIntervalMs;
    this._passedOnComplete = params.onComplete;
    this._passedOnInterrupt = params.onInterrupt;
    this._passedOnShake = params.onShake;

    makeObservable(this, {
      detectionIsActive: computed,
      isShaking: computed,
      isCompleted: computed,
    });
  }

  get detectionIsActive(): boolean {
    return this._detectionIsActive.value;
  }

  /**
   * Is a device currently shaking.
   * Is null if shaking detection isn't active
   */
  get isShaking(): boolean | null {
    return this._isShaking.value;
  }

  get isCompleted(): boolean {
    return this._isCompleted.value;
  }

  private _interruptShaking = (): void => {
    this._completeTimer.stop();
    this._isShaking.setValue(false);
    this._passedOnInterrupt?.(this);
  };

  private _onComplete = (): void => {
    this._passedOnComplete?.(this);
    this._isCompleted.setValue(true);
  };

  private _onShake = (): void => {
    this._isShaking.setValue(true);

    if (!this._completeTimer.isActive) {
      this._completeTimer.start(this._onComplete, this.durationMS);
    }

    // If it has already started, it will be restarted
    this._checkingTimer.start(this._interruptShaking, this.checkIntervalMs);

    this._passedOnShake?.(this);
  };

  startDetection = (): void => {
    this.stopDetection();

    this._detectionIsActive.setValue(true);
    this._isShaking.setValue(false);
    this._shakingDetectorEmitter.setValue(RNShake.addListener(this._onShake));
  };

  stopDetection = (): void => {
    this._shakingDetectorEmitter.value?.remove();
    this._completeTimer.stop();
    this._checkingTimer.stop();
    this._detectionIsActive.setValue(false);
    this._isShaking.setValue(null);
  };

  resetCompletion = (): void => {
    this._isCompleted.setValue(false);
  };

  static createDefault(
    params: Partial<
      Pick<
        ContinuousShakingDetectorParamsType,
        'onShake' | 'onComplete' | 'onInterrupt'
      >
    >
  ): ContinuousShakingDetector {
    return new ContinuousShakingDetector({
      durationMS: 5000,
      checkIntervalMs: 750,
      onShake: params.onShake ?? null,
      onInterrupt: params.onInterrupt ?? null,
      onComplete: params.onComplete ?? null,
    });
  }
}
