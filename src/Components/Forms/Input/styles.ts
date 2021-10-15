import styled, { css } from 'styled-components/native'
import Feather from '@expo/vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native';

export const Container = styled(TextInput) `
    width: 100%;
    padding: 16px 18px;
    font-size: ${RFValue(14)}px;
    background-color: ${({ theme })=> theme.colors.shape};
    color: ${({ theme })=> theme.colors.text_dark};
    margin-bottom: 8px;
    border-radius: 5px;
    font-family: ${({ theme })=> theme.fonts.regular};
`;