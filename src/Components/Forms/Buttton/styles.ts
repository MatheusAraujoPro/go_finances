import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
    background-color: ${({ theme })=> theme.colors.secondary};
    border-radius: 5px;
    align-items: center;
    padding: 18px;
`;

export const Title = styled.Text`
   font-family: ${({ theme })=> theme.fonts.midium};
   font-size: ${RFValue(18)}px;
   color: ${({ theme })=> theme.colors.shape};
`;
