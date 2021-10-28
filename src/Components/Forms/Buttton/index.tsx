import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler'

import {
    Container,
    Title
} from './styles';

interface Props extends RectButtonProperties{
    title: string
    onPress:() => void
}
export function Buttton({ title, ...rest }: Props) {
    return (
        <Container
            {...rest}
        >
            <Title>{title}</Title>
        </Container>
    )
}