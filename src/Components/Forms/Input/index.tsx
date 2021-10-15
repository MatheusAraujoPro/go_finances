import React from 'react';
import { View, TextInputProps } from 'react-native';

import { Container } from './styles';
type props = TextInputProps

export function Input({...rest}: props) {
  return (
      <Container 
        {...rest}
      >

      </Container>
  )
}

 