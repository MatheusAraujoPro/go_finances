import React from 'react';
import { Buttton } from '../../Components/Forms/Buttton';
import { Input } from '../../Components/Forms/Input';
import {
    Container,
    Header,
    Title,
    Form,
    Field
} from './styles';

export function Register() {
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Field>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                    />
                </Field>
                <Buttton
                    title="Enviar"
                />
            </Form>
        </Container>
    )
}
