import React from 'react';

import { 
    Container,
    Title,
    Amount 
} from './styles';

interface CardProps{
    title: string,
    amount: string,
    color: string
}

export function HisotryCard({ title, amount, color}: CardProps){
  return(
      <Container color={color}>
          <Title>{title}</Title>
          <Amount>{amount}</Amount>        
      </Container>
  )
}

