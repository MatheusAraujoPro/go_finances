import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { DashBoard } from './src/Screens/Dashboard';
import theme from './src/Global/Styles/theme'

export default function App() {
  return(
    <ThemeProvider theme={theme}>
      <DashBoard/>
    </ThemeProvider>    
  )
}
