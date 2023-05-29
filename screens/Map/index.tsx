import React from 'react';
import MapComponent from '../../components/Map';
import MapLoading from '../../components/MapLoading';
import SpeciesSelect from '../../components/SpeciesSelect';
import TreeDetailDrawer from '../../components/TreeDetailDrawer';
import {View, StyleSheet} from 'react-native';

function Map() {
  return (
    <View style={styles.container}>
      <MapComponent />
      <SpeciesSelect />
      <MapLoading />
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
