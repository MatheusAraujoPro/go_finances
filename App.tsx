import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes} from './src/routes/app.routes';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { Register } from './src/Screens/Register';
import theme from './src/Global/Styles/theme'

export default function App() {

  //Carregando as fontes
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )

}
