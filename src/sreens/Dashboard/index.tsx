import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
    Container,
    Header,
    Icon,
    Photo,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogouButton,
    LoadContainer


} from "./styles";
import { useTheme } from "styled-components";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    entries: HighlightProps,
    expensive: HighlightProps,
    total: HighlightProps
}



export function Dashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();


    async function loadTransaction() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date
                }

            });

        setTransactions(transactionFormatted);

        const total = entriesTotal - expensiveTotal;
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });
        setIsLoading(false);
        // console.log(transactionFormatted);
    }

    useEffect(() => {
        loadTransaction();
        // const dataKey = '@gofinances:transactions';
        // AsyncStorage.removeItem(dataKey);
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    }, []));

    function handleLogout() {
        Alert.alert('clicou');
    }

    return (
        <Container >
            
            {
                isLoading ? 
                <LoadContainer>
                   <ActivityIndicator 
                        color={theme.colors.primary} 
                        size='large'
                   /> 
                </LoadContainer>
                 :
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/78964559?v=4' }} />
                                <User>
                                    <UserGreeting>Olá</UserGreeting>
                                    <UserName>Luana </UserName>
                                </User>
                            </UserInfo>
                            <GestureHandlerRootView>
                                <LogouButton onPress={() => { }}>
                                    <Icon name="power" />
                                </LogouButton>
                            </GestureHandlerRootView>
                        </UserWrapper>
                    </Header>
                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction="Última entrada dia 13 de abril"
                        />
                        <HighlightCard
                            type="down"
                            title="Saídas"
                            amount={highlightData.expensive.amount}
                            lastTransaction="Última saída dia 03 de abril"
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction="01 à 16 de abril"
                        />
                    </HighlightCards>
                    <Transactions>
                        <Title>Listagem</Title>
                        <TransactionList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />
                    </Transactions>
                </>
            }
        </Container>
    );
}

