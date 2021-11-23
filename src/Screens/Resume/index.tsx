import React from 'react';
import { HisotryCard } from '../../Components/HisotryCard';

import { 
Container,
Header,
Title
} from './styles';

export function  Resume () {
  return(
      <Container>
          <Header>
              <Title>Resumo por Categoria</Title>
          </Header>
          
          <HisotryCard
            title="Compras"
            amount="R$ 120,00"
            color="red"
          />

      </Container>
  )
}

