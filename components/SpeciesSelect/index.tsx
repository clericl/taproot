import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

function SpeciesSelect() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '2.5%',
    width: '90%',
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default SpeciesSelect;
