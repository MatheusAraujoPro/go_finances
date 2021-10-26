import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Modal } from 'react-native'
import { InputForm } from '../../Components/Forms/InputForm';
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
interface FormData{
    name:string,
    amount:string
}
export function Register() {
    const [transactionTypeSelected, setTransactionTypeSelected] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',     
    })
    const {
        control,
        handleSubmit
    } = useForm()

    function handleTransactionTypes(type: 'up'| 'down') {  
        setTransactionTypeSelected(type)     
    }

    function handleCloseSelectCategoryModal() {  
        setCategoryModalOpen(false)     
    }

    function handleOpenSelectCategoryModal() {  
        setCategoryModalOpen(true)     
    }

    function handleRegister(form: FormData) {  
       console.log(form);          
    }


    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Field>
                    <InputForm 
                        name="name"
                        control={control}
                        placeholder="Nome" 
                    />
                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Preço" 
                    />
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
                <Buttton 
                    title="Enviar" 
                    onPress={handleSubmit(handleRegister)}
                />
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


