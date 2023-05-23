import * as React from 'react';
import { ButtonProps, Button as ReactNativeButton } from 'react-native';

import { COLORS } from '../../../styles/colors';

type Props = ButtonProps;

const Button: React.FC<Props> = (props) => {
  return <ReactNativeButton color={COLORS.darkBronze2} {...props} />;
};

export default React.memo(Button);
