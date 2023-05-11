import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import * as Location from 'expo-location';
import API from '../../utils/API';
import Loader from '../Loader';
import MapView, {Region, PROVIDER_GOOGLE} from 'react-native-maps';
import TreeMarker from '../TreeMarker';
import asyncDebounce from '../../utils/debounceAsync';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {StyleSheet, View} from 'react-native';
import {NtaDatumType, TreeDatumType} from '../../utils/types';

const NYC_LATLNG = {
  latitude: 40.7128,
  longitude: -73.9872,
  latitudeDelta: 0,
  longitudeDelta: 0.04757,
};

const MI_PER_LON_DEGREE = 54.6;

const calcZoom = (delta: number) => Math.log(360 / delta) / Math.LN2;

const debouncedGetTreeData = asyncDebounce(API.getTreeData, 400);
const debouncedGetNtaData = asyncDebounce(API.getNtaData, 400);

function Map() {
  const [loading, setLoading] = useState(false);
  const [ntaData, setNtaData] = useState<NtaDatumType[]>([]);
  const [treeData, setTreeData] = useState<TreeDatumType[]>([]);
  const mapRef = useRef<MapView>(null);

  const ntaRegions = useMemo(() => {
    const rendered = [];

    for (const ntaDatum of ntaData) {
      rendered.push(<TreeMarker key={ntaDatum.ntaCode} ntaDatum={ntaDatum} />);
    }

    return rendered;
  }, [treeData]);

  const treeMarkers = useMemo(() => {
    const rendered = [];

    for (const treeDatum of treeData) {
      rendered.push(<TreeMarker key={treeDatum.id} treeDatum={treeDatum} />);
    }

    return rendered;
  }, [treeData]);

  const handleRegionChange = async (newRegion: Region) => {
    const {latitude, longitude, longitudeDelta} = newRegion;
    const zoomLevel = calcZoom(longitudeDelta);
    const searchAreaRadius = longitudeDelta * MI_PER_LON_DEGREE;

    setLoading(true);

    if (zoomLevel > 16.5) {
      const newData = await debouncedGetTreeData(
        {latitude, longitude},
        searchAreaRadius,
      );
      setNtaData([]);
      setTreeData(newData);
      setLoading(false);
    } else if (zoomLevel > 10) {
      const newData = await debouncedGetNtaData(
        {latitude, longitude},
        searchAreaRadius,
      );
      setNtaData(newData);
      setTreeData([]);
      setLoading(false);
    } else {
      setNtaData([]);
      setTreeData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkPermissions = async () => {
      const checkRes = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (checkRes === RESULTS.DENIED) {
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      } else {
        const location = await Location.getLastKnownPositionAsync();
        if (location && mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0.003884,
          });
        }
      }
    };

    checkPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={NYC_LATLNG}
        mapType="terrain"
        moveOnMarkerPress={false}
        onRegionChange={handleRegionChange}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        showsUserLocation={true}
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
