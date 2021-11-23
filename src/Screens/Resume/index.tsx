import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HisotryCard } from '../../Components/HisotryCard';

import {
    Container,
    Header,
    Title,
    Content
} from './styles';
import { categories } from '../../Utils/categories';


interface TransactionData {  
    type: 'positive' | 'negative'
    name: string,
    amount: string,
    category: string,
    date: string
}

interface CategoryData {
    key: string,
    name: string,
    total: string,
    color: string
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

    async function loadData() {
        const dataKey = '@gofinances:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        //Pegando todas as transações de saída
        const expensives = responseFormatted
            .filter((expensive: TransactionData) => expensive.type === 'negative')

        const totalByCategory: CategoryData[] = []

        //Somando o valor de cada categoria
        categories.forEach(category => {
            let categorySum = 0

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key)
                    categorySum += Number(expensive.amount)
            })

            if (categorySum > 0) {
                const total = categorySum
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total,
                    color: category.color
                })
            }
        })

        setTotalByCategories(totalByCategory)

    }

    useEffect(() => {
        loadData()
    })
    return (
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

            <Content>
                {/* Como são poucas categorias o Método Map é pra esse caso, mais adequado */}
                {totalByCategories.map(item => (
                    <HisotryCard
                        key={item.key}
                        title={item.name}
                        amount={item.total}
                        color={item.color}
                    />
                ))}
            </Content>

        </Container>
    )
}

