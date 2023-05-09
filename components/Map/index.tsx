import React, {useEffect, useMemo, useRef, useState} from 'react';
import API from '../../utils/API';
import MapView, {Marker, Region, PROVIDER_GOOGLE} from 'react-native-maps';
import TreeMarker from '../TreeMarker';
import {StyleSheet, View} from 'react-native';
import {TreeDatumType} from '../../utils/types';
import debounce from 'lodash.debounce';

const NYC_LATLNG = {
  latitude: 40.7128,
  longitude: -73.9872,
  latitudeDelta: 0,
  longitudeDelta: 0.04757,
};

const MI_PER_LON_DEGREE = 54.6;

const calcZoom = (delta: number) =>
  Math.round(Math.log(360 / delta) / Math.LN2);

function Map() {
  const [treeData, setTreeData] = useState<TreeDatumType[]>([]);
  const mapRef = useRef<MapView>(null);

  const treeMarkers = useMemo(() => {
    const rendered = [];

    for (const treeDatum of treeData) {
      rendered.push(<TreeMarker key={treeDatum.id} treeDatum={treeDatum} />);
    }

    return rendered;
  }, [treeData]);

  const handleRegionChange = debounce(async (newRegion: Region) => {
    const {latitude, longitude, longitudeDelta} = newRegion;
    const zoomLevel = calcZoom(longitudeDelta);

    console.log('new zoom level:', zoomLevel);

    if (zoomLevel > 16) {
      const searchAreaRadius = longitudeDelta * MI_PER_LON_DEGREE;
      const newData = await API.getTreeData(
        {latitude, longitude},
        searchAreaRadius,
      );
      setTreeData(newData);
    }
  }, 500);

  useEffect(() => {
    const readDataIntoState = async () => {
      setTreeData([]);
    };

    readDataIntoState();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={NYC_LATLNG}
        mapType="terrain"
        onRegionChange={handleRegionChange}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
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
