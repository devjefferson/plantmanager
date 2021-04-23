import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import StackRoutes from './stack.router'

// import { Container } from './styles';



const Routes: React.FC = () => (
  <NavigationContainer>
    <StackRoutes/>
  </NavigationContainer>
)

export default Routes;