import styled from 'styled-components'
import theme from './theme'

/* Sobrescrevendo o tema padrão 
   do typeScript pelo meu tema
*/

declare module 'styled-components' {
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType
}