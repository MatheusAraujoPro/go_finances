import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HisotryCard } from '../../Components/HisotryCard';
import { useTheme } from 'styled-components'

import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer
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
    total: number,
    totalFormatted: string,
    percent: string,
    color: string
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
    const theme = useTheme()

    async function loadData() {
        const dataKey = '@gofinances:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        //Pegando todas as transações de saída
        const expensives = responseFormatted
            .filter((expensive: TransactionData) => expensive.type === 'negative')

        //Pegando o total das transações de saída
        const expensivesTotal = expensives
            .reduce((accumulator: number, expensive: TransactionData) => {
                return accumulator + Number(expensive.amount)
            }, 0)

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
                    
                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted: total,
                    percent,
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
                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        colorScale={categories.map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape,
                            }
                        }}
                        labelRadius={50}
                        x="percent"
                        y="total"
                        // height={300}
                    />
                </ChartContainer>
                {/* Como são poucas categorias o Método Map é pra esse caso, mais adequado */}
                {totalByCategories.map(item => (
                    <HisotryCard
                        key={item.key}
                        title={item.name}
                        amount={item.totalFormatted}
                        color={item.color}
                    />
                ))}
            </Content>

        </Container>
    )
}

