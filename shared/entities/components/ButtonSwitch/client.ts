import { SizeEnum } from '../../size';

export type ButtonSwitchSizesUnion = SizeEnum.xxl | SizeEnum.m;

export const buttonSwitchSizes: Record<ButtonSwitchSizesUnion, number> = {
  [SizeEnum.m]: 42,
  [SizeEnum.xxl]: 96,
};

export const buttonSwitchTextSizes: Record<ButtonSwitchSizesUnion, number> = {
  [SizeEnum.m]: 18,
  [SizeEnum.xxl]: 40,
};

export const buttonSwitchIconSizes: Record<ButtonSwitchSizesUnion, number> = {
  [SizeEnum.m]: 22,
  [SizeEnum.xxl]: 50,
};
