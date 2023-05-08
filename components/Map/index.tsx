import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import MapView, {Marker, Region, PROVIDER_GOOGLE} from 'react-native-maps';
import TreeMarker from '../TreeMarker';
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
  // const [zoom, setZoom] = useState<number>(1);
  const mapRef = useRef<MapView>(null);
  // const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const treeMarkers = useMemo(() => {
    const rendered = [];

    for (const treeDatum of treeData) {
      rendered.push(<TreeMarker key={treeDatum.id} treeDatum={treeDatum} />);
    }

    return rendered;
  }, [treeData]);

  const handleRegionChange = useCallback((newRegion: Region) => {
    // if (timerRef.current) {
    //   clearTimeout(timerRef.current);
    // }

    // timerRef.current = setTimeout(() => {
    //   const zoom = Math.round(
    //     Math.log(360 / newRegion.longitudeDelta) / Math.LN2,
    //   );
    // });
    console.log(newRegion);
  }, []);

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
