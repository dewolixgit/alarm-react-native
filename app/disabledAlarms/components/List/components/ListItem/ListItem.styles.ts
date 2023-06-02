import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styled } from 'styled-components/native';

import { StyledText } from '../../../../../../shared/components/typography';
import { SizeEnum } from '../../../../../../shared/entities/size';
import { COLORS } from '../../../../../../styles/colors';

export const Container = styled.View<{ hideBorderBottom?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 40px;

  padding: 14px 0;
  border-bottom-color: ${COLORS.beige3};

  border-bottom-width: ${({ hideBorderBottom = false }) =>
    hideBorderBottom ? 0 : '1px'};
`;

export const OffOptionText = styled(StyledText).attrs({
  size: SizeEnum.s,
})`
  color: ${COLORS.beige3};
`;

export const TimeContainer = styled.View`
  flex-grow: 2;
`;

export const TextContainer = styled.View`
  flex-shrink: 1;
  flex-grow: 4;
`;

export const DeleteIconContainer = styled.TouchableOpacity`
  flex-grow: 1;
`;

export const DeleteIcon = styled(MaterialCommunityIcons).attrs({
  size: 24,
  name: 'delete-outline',
  color: COLORS.beige1,
})`
  padding-right: 16px;
`;
