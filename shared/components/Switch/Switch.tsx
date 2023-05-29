import * as React from 'react';
import { Switch as ReactNativeSwitch } from 'react-native';
import { SwitchProps } from 'react-native/Libraries/Components/Switch/Switch';

import { COLORS } from '../../../styles/colors';

type Props = SwitchProps & {
  theme?: 'dark' | 'darker';
};

const Switch: React.FC<Props> = ({ theme = 'dark', ...switchProps }) => {
  return (
    <ReactNativeSwitch
      trackColor={{
        false: theme === 'dark' ? COLORS.darkBronze2 : COLORS.darkBronze1,
        true: COLORS.beige2,
      }}
      thumbColor={COLORS.white}
      {...switchProps}
    />
  );
};

export default React.memo(Switch);
