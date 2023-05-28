import { FlatList } from 'react-native';
import { styled } from 'styled-components/native';

import ContentContainer from '../../../../shared/components/ContentContainer';
import { Heading } from '../../../../shared/components/typography';
import { SizeEnum } from '../../../../shared/entities/size';
import { COLORS } from '../../../../styles/colors';
import { commonContentIndent } from '../../../../styles/consts';

export const StyledList = styled(FlatList)`
  padding: 0 ${commonContentIndent};
` as typeof FlatList;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'large',
  color: COLORS.beige1,
})`
  flex: 1;
`;

export const EmptyMessageContainer = styled(ContentContainer)`
  justify-content: center;
  align-items: center;
`;

export const EmptyMessage = styled(Heading).attrs({
  size: SizeEnum.s,
})`
  text-align: center;
`;
