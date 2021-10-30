import React, { useState, useEffect } from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form'

import { InputForm } from '../../Components/Forms/InputForm';
import { Buttton } from '../../Components/Forms/Buttton';
import { CategorySelectButton } from '../../Components/Forms/CategorySelectButton';
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

interface FormData {
    name: string,
    amount: string
}

const schema = Yup.object({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('Número não pode ser negativo')
        .required('Campo obrigatório')
}).required();

export function Register() {
    const [transactionTypeSelected, setTransactionTypeSelected] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const dataKey = '@gofinances:transactions'
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)

    })


    function handleTransactionTypes(type: 'up' | 'down') {
        setTransactionTypeSelected(type)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    async function handleRegister(form: FormData) {
        if (!TransactionTypes)
            return Alert.alert('Selecione um tipo de transação')

        if (category.key === 'category')
            return Alert.alert('Selecione uma categoria')


        const newTransaction = {
            name: form.name,
            amount: form.amount,
            transactionTypeSelected,
            category: category.name
        }

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : []

            const dataFormatted = [
                ...currentData,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível salvar')
        }
    }

    useEffect(() => {
        async function loadData() {
            const data = await AsyncStorage.getItem(dataKey)
            console.log(JSON.parse(data!));
        }

        loadData()     
    }, [])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>
                            <TransactionTypeButton
                                type="up"
                                title="income"
                                onPress={() => { handleTransactionTypes('up') }}
                                isActive={transactionTypeSelected === 'up'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="outcome"
                                onPress={() => { handleTransactionTypes('down') }}
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
        </TouchableWithoutFeedback>
    )
}


