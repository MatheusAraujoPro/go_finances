import styled from 'styled-components/native'
import Feather from '@expo/vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View `
   background-color: ${({theme})=> theme.colors.shape};
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
export const Title = styled.Text `
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme})=> theme.colors.text_dark};
`;
export const Icon = styled(Feather)`
    font-size: 40px;
`;
export const Footer = styled.View ``;
export const Amount = styled.Text `
    font-family: ${({theme})=> theme.fonts.midium};
    font-size: ${RFValue(32)}px;
    color: ${({theme})=> theme.colors.text_dark};
    margin-top: 38px;
`;
export const LastTransaction = styled.Text `
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.text};
`;