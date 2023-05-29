import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styled } from 'styled-components/native';

import { Button } from '../../shared/components/Button';
import ContentContainer from '../../shared/components/ContentContainer';
import { COLORS } from '../../styles/colors';

export const Container = styled(ContentContainer)`
  justify-content: space-between;
  padding-bottom: 16px;
`;

export const DeleteAlarmIcon = styled(MaterialCommunityIcons).attrs({
  size: 24,
  name: 'delete-outline',
  color: COLORS.beige1,
})`
  padding-right: 16px;
`;
