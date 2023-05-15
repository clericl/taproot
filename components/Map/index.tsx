import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import * as Location from 'expo-location';
import API from '../../utils/API';
import MapLoading from '../MapLoading';
import MapView, {Region, PROVIDER_GOOGLE} from 'react-native-maps';
import NtaRegion from '../NtaRegion';
import SpeciesSelect from '../SpeciesSelect';
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

// const debouncedGetTreeData = asyncDebounce(API.getTreeData, 400);
// const debouncedGetNtaData = asyncDebounce(API.getNtaData, 400);

type MarkerStateType = {
  ntas: NtaDatumType[];
  trees: TreeDatumType[];
};

function Map() {
  const [loading, setLoading] = useState(false);
  const [markerData, setMarkerData] = useState<MarkerStateType>({
    ntas: [],
    trees: [],
  });
  const mapRef = useRef<MapView>(null);

  const ntaRegions = useMemo(() => {
    const rendered = [];

    for (const ntaDatum of markerData.ntas) {
      rendered.push(<NtaRegion key={ntaDatum.ntaCode} ntaDatum={ntaDatum} />);
    }

    return rendered;
  }, [markerData]);

  const treeMarkers = useMemo(() => {
    const rendered = [];

    for (const treeDatum of markerData.trees) {
      rendered.push(<TreeMarker key={treeDatum.id} treeDatum={treeDatum} />);
    }

    return rendered;
  }, [markerData]);

  const updateMarkers = useRef(
    asyncDebounce(async (newRegion: Region) => {
      const {latitude, longitude, longitudeDelta} = newRegion;
      const zoomLevel = calcZoom(longitudeDelta);
      const searchAreaRadius = longitudeDelta * MI_PER_LON_DEGREE;

      if (zoomLevel > 16) {
        const newData = await API.getTreeData(
          {latitude, longitude},
          searchAreaRadius,
        );
        setMarkerData({
          ntas: [],
          trees: newData,
        });
      } else if (zoomLevel > 10) {
        const newData = await API.getNtaData({latitude, longitude}, 5);
        setMarkerData({
          ntas: newData,
          trees: [],
        });
      } else {
        setMarkerData({
          ntas: [],
          trees: [],
        });
      }

      setLoading(false);
    }, 400),
  ).current;

  const handleRegionChange = useCallback(
    (newRegion: Region) => {
      setLoading(true);
      updateMarkers(newRegion);
    },
    [updateMarkers],
  );

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
        {ntaRegions}
        {treeMarkers}
      </MapView>
      <MapLoading loading={loading} />
      <SpeciesSelect />
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
