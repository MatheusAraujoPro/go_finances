import React, { useState } from 'react';
import { Buttton } from '../../Components/Forms/Buttton';
import { CategorySelect } from '../../Components/Forms/CategorySelect';
import { Input } from '../../Components/Forms/Input';
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton';

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

    function handleTransactionTypes(type: 'up'| 'down') {  
        setTransactionTypeSelected(type)     
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
                    <CategorySelect title="Categorias"/>
                </Field>
                <Buttton title="Enviar" />
            </Form>
        </Container>
    )
}


