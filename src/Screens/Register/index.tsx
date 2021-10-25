import React, { useState } from 'react';
import { Modal } from 'react-native'

import { Buttton } from '../../Components/Forms/Buttton';
import { CategorySelectButton } from '../../Components/Forms/CategorySelectButton';
import { Input } from '../../Components/Forms/Input';
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Field,
    TransactionTypes
} from './styles';

export function Register() {
    const [transactionTypeSelected, setTransactionTypeSelected] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',     
    })

    function handleTransactionTypes(type: 'up'| 'down') {  
        setTransactionTypeSelected(type)     
    }

    function handleCloseSelectCategoryModal() {  
        setCategoryModalOpen(false)     
    }

    function handleOpenSelectCategoryModal() {  
        setCategoryModalOpen(true)     
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Field>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />
                    <TransactionTypes>
                        <TransactionTypeButton
                            type="up"
                            title="income"
                            onPress={() => {handleTransactionTypes('up')}}
                            isActive={transactionTypeSelected === 'up'}
                        />
                        <TransactionTypeButton
                            type="down"
                            title="outcome"
                            onPress={() => {handleTransactionTypes('down')}}
                            isActive={transactionTypeSelected === 'down'}
                        />
                    </TransactionTypes>
                    <CategorySelectButton
                        onPress={handleOpenSelectCategoryModal} 
                        title={category.name}
                    />
                </Field>
                <Buttton title="Enviar" />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    )
}


