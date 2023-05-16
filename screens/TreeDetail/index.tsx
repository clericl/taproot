import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function TreeDetail() {
  return (
    <View style={styles.container}>
      <Text>TreeDetail screen!</Text>
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

export default TreeDetail;
