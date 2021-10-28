import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler'
import {
  Container,
  Icon,
  Title,
} from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}
interface Props extends RectButtonProperties {
  title: string,
  type: 'up' | 'down',
  isActive: boolean
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
  return (
    <Container 
        {...rest} 
        isActive={isActive} 
        type={type}>
      <Icon
        name={icons[type]}
        type={type}
      />
      <Title>{title}</Title>
    </Container>
  )
}