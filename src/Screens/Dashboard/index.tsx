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
interface HighlightProps {
    amount: string,
    lastTransaction:string,
}
interface HighlightData {
    entries: HighlightProps,
    expensives: HighlightProps,
    total: HighlightProps
}

export function DashBoard() {
    const [transacations, setTransactions] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

    function getLastTransaction(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ) {
        //Pegando as transações de tipo positivo e dentre elas extraindo
        //comparando as suas datas, pegando e formatando a mais recente

        const lastTransactions = Math.max.apply(Math, collection
            .filter(transaction => transaction.type === 'negative')
            .map(transaction => new Date(transaction.date).getTime())) 

        const lastTransactionsFormated = new Date(lastTransactions)

        return `${lastTransactionsFormated.getDate()} de ${lastTransactionsFormated.toLocaleString('pt-BR', {month: 'long'})}`
                   
    }

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response) : []

        let entriesTotal = 0
        let expensiveTotal = 0
       

        const transcationsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount)
                } else {
                    expensiveTotal += Number(item.amount)
                }

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

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    date,
                    category: item.category
                }
            })


        setTransactions(transcationsFormatted)

        const lastTransactionEntrie = getLastTransaction(transactions, 'positive')
        const lasTransactionExpensive = getLastTransaction(transactions, 'negative') 
        let totalInterval = `01 à ${lasTransactionExpensive}`     

        const total = entriesTotal - expensiveTotal

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última transação dia ${lastTransactionEntrie}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL' 
                }),
                lastTransaction: `Última transação dia ${lasTransactionExpensive}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        })

    }

    useEffect(() => {
        loadTransactions()
        // console.log(highlightData);
        


        // async function excluir(){
        //     await AsyncStorage.removeItem('@gofinances:transactions')
        // }
        // excluir()
    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []))

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
                    amount={highlightData.entries.amount}                    
                    lastTranstacion={highlightData.entries.lastTransaction}
                    // amount=""                   
                    // lastTranstacion=""
                />
                <HighlightCard
                    type="down"
                    title="Saída"
                    amount={highlightData.expensives.amount}                    
                    lastTranstacion={highlightData.expensives.lastTransaction}
                    // amount=""                   
                    // lastTranstacion=""
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount={highlightData.total.amount}                  
                    lastTranstacion={highlightData.total.lastTransaction}
                    // amount=""                   
                    // lastTranstacion=""
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={transacations}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>

        </Container>
    )
}