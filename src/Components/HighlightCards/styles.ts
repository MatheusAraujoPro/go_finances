import styled, { css } from 'styled-components/native'
import Feather from '@expo/vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps{
    type: 'up' | 'down' | 'total'
}

export const Container = styled.View<TypeProps>`
   background-color: ${({theme, type})=> 
   type === 'total' ? theme.colors.secondary : theme.colors.shape };
   width: ${RFValue(300)}px;
   border-radius: 5px;
   padding: 18px 20px;
   /* sobrescrevevndo o estilo de cima */
   padding-bottom: ${RFValue(42)}px;
   margin-right: 16px;
`;

export const Header = styled.View `
    flex-direction: row;
    justify-content: space-between;
    /* Padrão do Align Itens */
    align-items: flex-start;
`; 
export const Title = styled.Text<TypeProps> `
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme, type})=> 
    type ==='total'? theme.colors.shape:theme.colors.text_dark };
  
`;
export const Icon = styled(Feather)<TypeProps>`
    font-size: 40px;
    ${({type}) => type === 'up'&& css`
        color: ${({theme})=> theme.colors.sucess};
    `}

    ${({type}) => type === 'down'&& css`
        color: ${({theme})=> theme.colors.attention};
    `}

    ${({type}) => type === 'total'&& css`
        color: ${({theme})=> theme.colors.shape};
    `}
`;
export const Footer = styled.View ``;
export const Amount = styled.Text<TypeProps> `
    font-family: ${({theme})=> theme.fonts.midium};
    font-size: ${RFValue(32)}px;
    color: ${({theme, type})=> 
    type === 'total'? theme.colors.shape :theme.colors.text_dark};
    margin-top: 38px;
`;
export const LastTransaction = styled.Text<TypeProps> `
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({theme, type})=> 
     type === 'total'? theme.colors.shape :theme.colors.text};
`;