import { SizeEnum } from '../size';

export enum FontWeightEnum {
  regular = 'regular',
  medium = 'medium',
  semibold = 'semibold',
  bold = 'bold',
}

export type NunitoFontWeightUnion =
  | FontWeightEnum.regular
  | FontWeightEnum.semibold
  | FontWeightEnum.bold;

export type RobotoFontWeightUnion =
  | FontWeightEnum.regular
  | FontWeightEnum.medium
  | FontWeightEnum.bold;

export type TextSizeUnion =
  | SizeEnum.xl
  | SizeEnum.l
  | SizeEnum.m
  | SizeEnum.s
  | SizeEnum.xs;

export type HeadingSizeUnion =
  | SizeEnum.xl
  | SizeEnum.l
  | SizeEnum.m
  | SizeEnum.s;

export enum FontTypeEnum {
  text = 'text',
  heading = 'heading',
}
