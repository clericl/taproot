import React, {useEffect, useMemo, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
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
  console.log(treeData);

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
      setTreeData(treeJson.slice(0, 20));
    };

    readDataIntoState();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={NYC_LATLNG}
        mapType="terrain"
        provider={PROVIDER_GOOGLE}
        style={styles.map}>
        {treeMarkers}
        <Marker
          title="hello world"
          description="can you hear me?"
          coordinate={{
            latitude: 40.67513539614678,
            longitude: -73.96392560469623,
          }}
          pinColor="#5ca13a"
        />
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
