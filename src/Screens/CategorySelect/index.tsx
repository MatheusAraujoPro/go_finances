import React from 'react';
import { FlatList, Text } from 'react-native';
import { categories } from '../../Utils/categories';
import { Buttton } from '../../Components/Forms/Buttton';

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from './styles';
interface Category {
    key: string,
    name: string
}

interface Props {
    category: string,
    setCategory: (category: Category) => void,
    closeSelectCategory: () => void
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: Props) {
    return (
        <Container>
            <Header>
                <Title>Categorias</Title>
            </Header>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.key}
                style={{ flex: 1, width: '100%' }}
                renderItem={({ item }) => (
                    <Category>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />
            <Footer>
                <Buttton title="Selecionar" />
            </Footer>
        </Container>
    )
}

