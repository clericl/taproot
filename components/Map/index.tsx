import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import readGzipToJson from '../../utils/readGzipToJson';

import TREE_DATA from '../../data/db.gz';

const NYC_LATLNG = {
  latitude: 40.7128,
  longitude: -73.9872,
  latitudeDelta: 0.06866,
  longitudeDelta: 0.04757,
};

function Map() {
  useEffect(() => {
    const readDataIntoState = async () => {
      const treeJson = await readGzipToJson(TREE_DATA);
      console.log(treeJson);
    };

    readDataIntoState();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        mapType="terrain"
        provider={PROVIDER_GOOGLE}
        region={NYC_LATLNG}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
