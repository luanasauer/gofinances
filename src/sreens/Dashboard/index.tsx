import React from "react";
import { Alert} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    LogouButton


 } from "./styles";

 export interface DataListProps extends TransactionCardProps{
     id: string;
 }
export function Dashboard(){

    const data: DataListProps[] = [
        {
            id:'1',
            type:'positive',
            title: "Desenvolvimento Site", 
            amount: "R$ 12.000,00", 
            category: {
                name:'vendas',
                icon:'dollar-sign'
            },
            date: "13/04/2021"
        },
        {
            id:'2',
            type:'negative',
            title: "Hamburger", 
            amount: "R$ 59,00", 
            category: {
                name:'Alimentação',
                icon:'coffee'
            },
            date: "10/04/2021"
        },
        {
            id:'3',
            type:'negative',
            title: "Aluguel", 
            amount: "R$ 1.200,00", 
            category: {
                name:'Casa',
                icon:'shopping-bag'
            },
            date: "13/04/2021"
        }
    ]

    function handleLogout (){
        Alert.alert('clicou');
    }

    return(
         <Container >
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/78964559?v=4'}}/>
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>Luana </UserName>
                        </User>
                    </UserInfo>
                    <GestureHandlerRootView>
                        <LogouButton onPress={()=>{}}>
                            <Icon name="power"/>
                        </LogouButton>
                    </GestureHandlerRootView>
                </UserWrapper>  
            </Header>
            <HighlightCards>
                <HighlightCard 
                    type="up"
                    title="Entradas" 
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas" 
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total" 
                    amount="R$ 16.141,00"
                    lastTransaction="01 à 16 de abril"
                />
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item})=> <TransactionCard  data={item}/>}
                    
                />
                
            </Transactions>
        </Container>
    );
}

 