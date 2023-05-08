import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Landing from './screens/Landing';
import Map from './screens/Map';
import Journey from './screens/Journey';
import Learn from './screens/Learn';
import Profile from './screens/Profile';
import RedisController from './components/RedisController';

export type RootStackParamList = {
  Landing: undefined;
  Map: {
    fromLanding?: boolean;
  };
  Journey: undefined;
  Learn: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <RedisController>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Journey" component={Journey} />
          <Stack.Screen name="Learn" component={Learn} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </RedisController>
  );
}

export default App;
