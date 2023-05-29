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
