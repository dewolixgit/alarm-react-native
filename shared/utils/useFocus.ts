import { useFocusEffect } from 'expo-router';
import * as React from 'react';

const useFocus = () => {
  const [inFocus, setInFocus] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setInFocus(true);
      return () => {
        setInFocus(false);
      };
    }, [])
  );

  return { inFocus };
};

export default useFocus;
