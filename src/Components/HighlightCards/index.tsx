import React from 'react';
import { } from 'react-native';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';

interface props {
    type: 'up' | 'down' | 'total'
    title: string,
    amount: string,
    lastTranstacion: string
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}
export function HighlightCard({ title, amount, lastTranstacion, type }: props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type}/>
            </Header>
            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTransaction type={type}>{lastTranstacion}</LastTransaction>
            </Footer>
        </Container>
    )
}

