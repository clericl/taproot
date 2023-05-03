import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Learn() {
  return (
    <View style={styles.container}>
      <Text>Learn screen!</Text>
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

export default Learn;
