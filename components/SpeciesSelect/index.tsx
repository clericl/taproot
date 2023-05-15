import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {StyleSheet, TextInput, View} from 'react-native';

function SpeciesSelect() {
  return (
    <View style={styles.container}>
      <Shadow distance={2} style={styles.shadow}>
        <TextInput
          placeholder="Sort by species"
          placeholderTextColor="#969fae"
          style={styles.input}
        />
      </Shadow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 7,
    width: '82.5%',
    left: 10,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  shadow: {
    width: '100%',
  },
});

export default SpeciesSelect;
