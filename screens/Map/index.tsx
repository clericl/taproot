import React, {useEffect} from 'react';
import {RootStackParamList} from '../../App';
import {View, Text, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

function Map({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Map'>) {
  useEffect(() => {
    navigation.setOptions({headerBackVisible: !route?.params?.fromLanding});
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      <Text>Map screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Map;
