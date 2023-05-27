import { NativeModules } from 'react-native';
import 'react-native-get-random-values';
import * as uuid from 'uuid';

const AlarmService = NativeModules.AlarmModule;

export async function scheduleAlarm(alarm: Alarm) {
  if (!(alarm instanceof Alarm)) {
    alarm = new Alarm(alarm);
  }
  await AlarmService.set(alarm.toAndroid());
  console.log('scheduling alarm: ', JSON.stringify(alarm));
}

export async function enableAlarm(uid: string) {
  await AlarmService.enable(uid);
}

export async function disableAlarm(uid: string) {
  await AlarmService.disable(uid);
}

export async function stopAlarm() {
  await AlarmService.stop();
}

export async function snoozeAlarm() {
  await AlarmService.snooze();
}

export async function removeAlarm(uid: string) {
  await AlarmService.remove(uid);
}

export async function updateAlarm(alarm: Alarm) {
  if (!(alarm instanceof Alarm)) {
    alarm = new Alarm(alarm);
  }
  await AlarmService.update(alarm.toAndroid());
}

export async function removeAllAlarms() {
  await AlarmService.removeAll();
}

export async function getAllAlarms() {
  const alarms = await AlarmService.getAll();
  return alarms.map((a: Alarm) => Alarm.fromAndroid(a));
}

export async function getAlarm(uid: string) {
  const alarm = await AlarmService.get(uid);
  return Alarm.fromAndroid(alarm);
}

export async function getAlarmState() {
  return AlarmService.getState();
}

export default class Alarm {
  uid: string;
  enabled: boolean;
  title: string;
  description: string;
  hour: number;
  minutes: number;
  snoozeInterval: number;
  repeating: boolean;
  active: boolean;
  days: number[];

  constructor(
    params: {
      uid?: string;
      enabled?: boolean;
      title?: string;
      description?: string;
      hour?: number;
      minutes?: number;
      snoozeInterval?: number;
      repeating?: boolean;
      active?: boolean;
      days?: number[];
    } = {}
  ) {
    this.uid = params.uid ?? uuid.v4();
    this.enabled = params.enabled ?? true;
    this.title = params.title ?? 'Alarm';
    this.description = params.description ?? 'Wake up';
    this.hour = params.hour ?? new Date().getHours();
    this.minutes = params.minutes ?? new Date().getMinutes() + 1;
    this.snoozeInterval = params.snoozeInterval ?? 1;
    this.repeating = params.repeating ?? false;
    this.active = params.active ?? true;
    this.days = params.days ?? [new Date().getDay()];
  }

  static getEmpty() {
    return new Alarm({
      title: '',
      description: '',
      hour: 0,
      minutes: 0,
      repeating: false,
      days: [],
    });
  }

  toAndroid(): {
    uid: string;
    enabled: boolean;
    title: string;
    description: string;
    hour: number;
    minutes: number;
    snoozeInterval: number;
    repeating: boolean;
    active: boolean;
    days: number[];
  } {
    return {
      uid: this.uid,
      enabled: this.enabled,
      title: this.title,
      description: this.description,
      hour: this.hour,
      minutes: this.minutes,
      snoozeInterval: this.snoozeInterval,
      repeating: this.repeating,
      active: this.active,
      days: toAndroidDays(this.days),
    };
  }

  static fromAndroid(alarm: {
    uid: string;
    enabled: boolean;
    title: string;
    description: string;
    hour: number;
    minutes: number;
    snoozeInterval: number;
    repeating: boolean;
    active: boolean;
    days: number[];
  }) {
    alarm.days = fromAndroidDays(alarm.days);
    return new Alarm(alarm);
  }

  getTimeString() {
    const hour = this.hour < 10 ? '0' + this.hour : `${this.hour}`;
    const minutes = this.minutes < 10 ? '0' + this.minutes : `${this.minutes}`;
    return { hour, minutes };
  }

  getTime() {
    const timeDate = new Date();
    timeDate.setMinutes(this.minutes);
    timeDate.setHours(this.hour);
    return timeDate;
  }
}

export function toAndroidDays(daysArray: number[]) {
  return daysArray.map((day) => (day + 1) % 7);
}

export function fromAndroidDays(daysArray: number[]) {
  return daysArray.map((d) => (d === 0 ? 6 : d - 1));
}
