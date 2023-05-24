import * as React from 'react';
import { TextInputProps } from 'react-native';

import { COLORS } from '../../../styles/colors';
import { blockShadow1 } from '../../../styles/mixins';

import { InputLabel, StyledInput } from './Input.styles';

type Props = TextInputProps & {
  label?: string;
};

const Input: React.FC<Props> = ({ style, selectionColor, label, ...props }) => {
  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput
        style={[blockShadow1, style]}
        selectionColor={selectionColor ?? COLORS.beige1}
        {...props}
      />
    </>
  );
};

export default React.memo(Input);
