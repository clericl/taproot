import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './screens/Landing';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
