import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import Feather from '@expo/vector-icons/Feather'
import { RectButton } from 'react-native-gesture-handler'

interface IconProps {
    type: 'up' | 'down'
}

interface ContainerProps{
    isActive: boolean,
    type: 'up' | 'down'
}

export const Container = styled(RectButton)<ContainerProps>` 
    width: 48%;
    flex-direction: row;
    align-items: center;
    /* Border-Widh, style, color */
    ${({ isActive, type })=> isActive === true && type === 'down' && css `
        background-color: ${({ theme })=> theme.colors.attention_light};
        border-style: none;
    `}

    ${({ isActive, type })=> isActive === true && type === 'up' && css `
        background-color: ${({ theme })=> theme.colors.sucess_light};
        border-style: none;
    `}
    border: ${({ isActive })=> isActive ? 0 : 1.5}px;  
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};
    padding: 16px;
    justify-content: center;
`;

export const Icon = styled(Feather) <IconProps> `
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({ theme, type }) =>
        type === 'up' ? theme.colors.sucess : theme.colors.attention};
 
`;
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;  
`;