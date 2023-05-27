import React from 'react';
import MapComponent from '../../components/Map';
import SpeciesSelect from '../../components/SpeciesSelect';
import {View, StyleSheet} from 'react-native';
import TreeDetailDrawer from '../../components/TreeDetailDrawer';

function Map() {
  return (
    <View style={styles.container}>
      <MapComponent />
      <SpeciesSelect />
      <TreeDetailDrawer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default Map;
