
import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { 
    Container, 
    Header, 
    Title, 
    Form , 
    Fields, 
    TransactionTypes
} from "./styles";

export function Register(){

    const [transactionType, setTransactioType] = useState('');
    function handleTransactionTypesSelect(type: 'up'|'down'){
        setTransactioType(type);
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />
                    <TransactionTypes>
                        <TransactionTypeButton
                            type='up'
                            title="Income"
                            onPress={()=>{handleTransactionTypesSelect('up')}}
                            isActive={transactionType==='up'}
                        />
                        <TransactionTypeButton 
                            type='down'
                            title="Outcome"
                            onPress={()=>{handleTransactionTypesSelect('down')}}
                            isActive={transactionType==='down'}
                        />
                    </TransactionTypes>
                    <CategorySelect title="Categoria"/>
                </Fields>
                <Button title="Enviar"/>
            </Form>
        </Container>
    );
}