import React, {useEffect, useMemo, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import TreeMarker from '../TreeMarker';
import readGzipToJson from '../../utils/readGzipToJson';
import {StyleSheet, View} from 'react-native';
import {TreeDatumType} from '../../utils/types';

const NYC_LATLNG = {
  latitude: 40.7128,
  longitude: -73.9872,
  latitudeDelta: 0.06866,
  longitudeDelta: 0.04757,
};

function Map() {
  const [treeData, setTreeData] = useState<TreeDatumType[]>([]);

  const treeMarkers = useMemo(() => {
    const rendered = [];

    for (const treeDatum of treeData) {
      rendered.push(<TreeMarker key={treeDatum.id} treeDatum={treeDatum} />);
    }

    return rendered;
  }, [treeData]);

  useEffect(() => {
    const readDataIntoState = async () => {
      const dataPath = require('../../data/manhattan_trees.gz');
      const treeJson = await readGzipToJson(dataPath);
      setTreeData(treeJson);
    };

    readDataIntoState();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        mapType="terrain"
        provider={PROVIDER_GOOGLE}
        region={NYC_LATLNG}
        style={styles.map}>
        {treeMarkers}
      </MapView>
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
