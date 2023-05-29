import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilterController from './components/FilterController';
import Journey from './screens/Journey';
import Landing from './screens/Landing';
import Learn from './screens/Learn';
import Map from './screens/Map';
import Profile from './screens/Profile';
import store from './redux/utils/store';

export type RootStackParamList = {
  Landing: undefined;
  Map: undefined;
  Journey: undefined;
  Learn: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <GestureHandlerRootView style={styles.app}>
      <Provider store={store}>
        <FilterController>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Landing"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="Journey" component={Journey} />
              <Stack.Screen name="Learn" component={Learn} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
          </NavigationContainer>
        </FilterController>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
