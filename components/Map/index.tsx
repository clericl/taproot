import React, {useCallback, useMemo, useRef, useState} from 'react';
import API from '../../utils/API';
import Loader from '../Loader';
import MapView, {Region, PROVIDER_GOOGLE} from 'react-native-maps';
import TreeMarker from '../TreeMarker';
import asyncDebounce from '../../utils/debounceAsync';
import {StyleSheet, View} from 'react-native';
import {TreeDatumType} from '../../utils/types';

const NYC_LATLNG = {
  latitude: 40.7128,
  longitude: -73.9872,
  latitudeDelta: 0,
  longitudeDelta: 0.04757,
};

const MI_PER_LON_DEGREE = 54.6;

const calcZoom = (delta: number) =>
  Math.round(Math.log(360 / delta) / Math.LN2);

const debouncedGetTreeData = asyncDebounce(API.getTreeData, 400);

function Map() {
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState<TreeDatumType[]>([]);
  const mapRef = useRef<MapView>(null);

  const treeMarkers = useMemo(() => {
    const rendered = [];

    for (const treeDatum of treeData) {
      rendered.push(<TreeMarker key={treeDatum.id} treeDatum={treeDatum} />);
    }

    return rendered;
  }, [treeData]);

  const handleRegionChange = useCallback(async (newRegion: Region) => {
    const {latitude, longitude, longitudeDelta} = newRegion;
    const zoomLevel = calcZoom(longitudeDelta);
    // console.log('new zoom level:', zoomLevel);

    if (zoomLevel > 16) {
      setLoading(true);
      const searchAreaRadius = longitudeDelta * MI_PER_LON_DEGREE;
      const newData = await debouncedGetTreeData(
        {latitude, longitude},
        searchAreaRadius,
      );
      setTreeData(newData);
      setLoading(false);
    }
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
      </MapView>
      <Loader loading={loading} />
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
