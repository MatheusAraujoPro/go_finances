import React from 'react';
import { View } from 'react-native';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date

} from './styles';

export function TransactionCard(){
  return(
    <Container>
      <Title>Desenvolvimento de Sistemas</Title>
      <Amount>12.000,00</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign"/>
          <CategoryName>Nome</CategoryName>
        </Category>
        <Date>13/04/2020</Date>
      </Footer>
    </Container>
  )
}

