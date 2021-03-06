import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components'
import { DashBoard } from '../Screens/Dashboard';
import { Register } from '../Screens/Register';
import { Resume } from '../Screens/Resume';



const { Navigator, Screen } = createBottomTabNavigator();
export function AppRoutes() {
    const theme = useTheme()
    return (
        <Navigator
            // Configurações padrão das Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                // Estilo da TabBar
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen
                name="Listagem"
                component={DashBoard}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    )
}