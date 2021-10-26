import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
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

    function handleRegister(form: FormData) {
        if (!TransactionTypes)
            return Alert.alert('Selecione um tipo de transação')

        if (category.key === 'category')
            return Alert.alert('Selecione uma categoria')


        const data = {
            name: form.name,
            amount: form.amount,
            TransactionTypes,
            category: category
        }
        console.log(data);

    }


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


