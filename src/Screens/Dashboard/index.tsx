import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../Components/HighlightCards';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard';
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
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string
}

export function DashBoard() {
    const [data, setData] = useState<DataListProps[]>([])

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions'
        const response = await AsyncStorage.getItem(dataKey)  
        const transactions = response ? JSON.parse(response): []   
     
        const transcationsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) =>{
            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
              
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date)) 
                       
            return{
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                date,
                category: item.category
            }
        })

        setData(transcationsFormatted)
        console.log(transcationsFormatted);
        
    }

    useEffect(() => {
        loadTransactions()
        // async function excluir(){
        //     await AsyncStorage.removeItem('@gofinances:transactions')
        // }
        // excluir()
    }, [])

    useFocusEffect(useCallback(()=>{
        loadTransactions()
    },[]))

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
                    <LogoutButton onPress={() => { }}>
                        <Icon name="power" />
                    </LogoutButton>
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

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>

        </Container>
    )
}