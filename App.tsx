import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import FilterController from './components/FilterController';
import Journey from './screens/Journey';
import Landing from './screens/Landing';
import Learn from './screens/Learn';
import Map from './screens/Map';
import Profile from './screens/Profile';
import TreeDetail from './screens/TreeDetail';

export type RootStackParamList = {
  Landing: undefined;
  Map: undefined;
  TreeDetail: {
    id: number;
  };
  Journey: undefined;
  Learn: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <FilterController>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="TreeDetail" component={TreeDetail} />
          <Stack.Screen name="Journey" component={Journey} />
          <Stack.Screen name="Learn" component={Learn} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </FilterController>
  );
}

export default App;
