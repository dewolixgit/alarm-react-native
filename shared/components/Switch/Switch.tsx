import * as React from 'react';
import { Switch as ReactNativeSwitch } from 'react-native';
import { SwitchProps } from 'react-native/Libraries/Components/Switch/Switch';

import { COLORS } from '../../../styles/colors';

const Switch: React.FC<SwitchProps> = (props) => {
  return (
    <ReactNativeSwitch
      trackColor={{
        false: COLORS.darkBronze2,
        true: COLORS.beige2,
      }}
      thumbColor={COLORS.white}
      {...props}
    />
  );
};

export default React.memo(Switch);
