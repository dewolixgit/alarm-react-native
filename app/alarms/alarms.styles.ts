import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { styled } from 'styled-components/native';

import { COLORS } from '../../styles/colors';
import { commonContentIndent } from '../../styles/consts';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.darkBronze1};
`;

export const StyledList = styled(FlatList)`
  padding: 0 ${commonContentIndent};
` as typeof FlatList;

export const AddAlarmIcon = styled(MaterialCommunityIcons).attrs({
  size: 24,
  name: 'clock-plus-outline',
  color: COLORS.beige1,
})`
  padding-right: 16px;
`;
