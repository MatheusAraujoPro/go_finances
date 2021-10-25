import React from 'react';
import { FlatList } from 'react-native';
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
    category: Category,
    setCategory: (category: Category) => void,
    closeSelectCategory: () => void
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: Props) {
    function handleCategorySelect(category: Category){
        setCategory(category)
    }
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
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />
            <Footer>
                <Buttton 
                    title="Selecionar" 
                    onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    )
}

