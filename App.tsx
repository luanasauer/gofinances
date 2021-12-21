//primeiro imports de bibliotecas
import React from 'react';
import { ThemeProvider } from 'styled-components';

import{
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';

//segundo components
import theme from './src/global/styles/theme';
import { Dashboard } from './src/sreens/Dashboard';
import AppLoading from 'expo-app-loading';

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
            <Dashboard/>
        </ThemeProvider>
    );
}
