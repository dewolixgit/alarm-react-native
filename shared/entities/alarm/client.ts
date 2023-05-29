import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import { Icon } from '@expo/vector-icons/build/createIconSet';

export enum AlarmOffOptionEnum {
  gesture = 'gesture',
  math = 'math',
  shake = 'shake',
}

export const alarmOffOptionIcons: Record<
  AlarmOffOptionEnum,
  { IconComponent: Icon<any, any>; iconName: string }
> = {
  [AlarmOffOptionEnum.math]: {
    IconComponent: MaterialCommunityIcons,
    iconName: 'calculator-variant-outline',
  },
  [AlarmOffOptionEnum.gesture]: {
    IconComponent: FontAwesome,
    iconName: 'power-off',
  },
  [AlarmOffOptionEnum.shake]: {
    IconComponent: AntDesign,
    iconName: 'shake',
  },
};

export const alarmOffOptionTextMap: Record<AlarmOffOptionEnum, string> = {
  [AlarmOffOptionEnum.math]: 'Выключается вычислением',
  [AlarmOffOptionEnum.gesture]: 'Выключается жестом',
  [AlarmOffOptionEnum.shake]: 'Выключается тряской устройства',
};

export const alarmOffOptionShortTextMap: Record<AlarmOffOptionEnum, string> = {
  [AlarmOffOptionEnum.math]: 'Математика',
  [AlarmOffOptionEnum.gesture]: 'Жест',
  [AlarmOffOptionEnum.shake]: 'Встряхивание',
};
