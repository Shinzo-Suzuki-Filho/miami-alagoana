import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import './src/i18n';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AIScreen from './src/screens/AIScreen';
import MapScreen from './src/screens/MapScreen';
import ReportScreen from './src/screens/ReportScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import { Colors } from './src/theme/Colors';

const Stack = createStackNavigator();

export default function App() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.surface,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Mapa TomTom' }} />
        <Stack.Screen name="AI" component={AIScreen} options={{ title: 'Assistente IA' }} />
        <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Denúncia' }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Explorar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Pequeno fix para o DummyScreen que esqueci de importar
import { View, Text } from 'react-native';
