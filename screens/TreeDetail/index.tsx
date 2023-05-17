import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {View, Text, StyleSheet} from 'react-native';

function TreeDetail({
  route,
}: NativeStackScreenProps<RootStackParamList, 'TreeDetail'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TreeDetail screen!</Text>
      <Text style={styles.text}>{JSON.stringify(route, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  text: {
    color: 'black',
  },
});

export default TreeDetail;
