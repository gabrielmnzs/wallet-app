import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Transactions from './src/screens/Transactions';

const Stack = createStackNavigator();

export default function App(){  
  return (
    <NavigationContainer>   
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Transactions" component={Transactions}/>
    </Stack.Navigator>  
    </NavigationContainer>    
  );  
}
