//primeiro imports de bibliotecas
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading'; 
import { ThemeProvider } from 'styled-components';

import {NavigationContainer} from '@react-navigation/native';
  
import{
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';

//segundo components
import theme from './src/global/styles/theme';
import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/sreens/SignIn';
import { AuthProvider } from './src/hooks/auth';


export default function App() {

    const[fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if(!fontsLoaded){
        return <AppLoading/>
    }

    return (
        <ThemeProvider theme={theme} >
            <NavigationContainer>
                <StatusBar barStyle="light-content"/>
                {/* <AppRoutes/> */}
                <AuthProvider >
                    <SignIn/>
                </AuthProvider>
            </NavigationContainer>
        </ThemeProvider>
    );
}

