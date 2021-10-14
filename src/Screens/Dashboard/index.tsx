import React from 'react';
import { HighlightCard } from '../../Components/HighlightCards';
import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserWrapper,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards
} from './styles';

export function DashBoard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/61169797?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Matheus</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entrada"
                    amount="17.400,00"
                    lastTranstacion="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saída"
                    amount="1.259,00"
                    lastTranstacion="Última saída dia 5 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="16.141,00"
                    lastTranstacion="01 à 16 de abril"
                />
            </HighlightCards>

        </Container>
    )
}