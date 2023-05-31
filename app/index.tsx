import { useFocusEffect, useRouter } from 'expo-router';
import * as React from 'react';

export default () => {
  const { push } = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      push({
        pathname: 'alarms',
      });
    }, [])
  );

  return null;
};
