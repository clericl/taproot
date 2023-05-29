import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import * as Location from 'expo-location';
import MapView, {
  MapPressEvent,
  Region,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import NtaRegion from '../NtaRegion';
import SelectedTreeMarker from '../SelectedTreeMarker';
import TreeMarker from '../TreeMarker';
import checkForTreeMarkerPress from '../../utils/checkForTreeMarkerPress';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FilterContext} from '../FilterController';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {clearTreeDetailData} from '../../redux/reducers/treeDetail';
import {requestFetchMapData, requestFetchTreeDetail} from '../../redux/actions';
import {calcDelta} from '../../utils/calcZoomLevel';
import {useAppDispatch, useAppSelector} from '../../redux/utils/hooks';

const NYC_LATLNG = {
  latitude: 40.7128,
  longitude: -73.9872,
  latitudeDelta: 0,
  longitudeDelta: 0.04757,
};

function Map() {
  const dispatch = useAppDispatch();
  const {markerData, zoomLevel} = useAppSelector(state => state.mapData);
  const mapRef = useRef<MapView>(null);
  const {species} = useContext(FilterContext);

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
  }, [markerData.trees]);

  const handlePress = useCallback(
    (pressEvent: MapPressEvent) => {
      const coords = pressEvent.nativeEvent.coordinate;
      const pressedMarker = checkForTreeMarkerPress(
        markerData.trees,
        coords,
        zoomLevel,
      );

      if (pressedMarker) {
        dispatch(clearTreeDetailData());
        dispatch(requestFetchTreeDetail(pressedMarker.id));

        if (mapRef.current) {
          mapRef.current.animateCamera({
            center: {
              latitude: coords.latitude - calcDelta(zoomLevel) / 1.75,
              longitude: coords.longitude,
            },
          });
        }
      }
    },
    [dispatch, markerData.trees, zoomLevel],
  );

  const handleRegionChange = useCallback(
    (region: Region) => {
      dispatch(requestFetchMapData({region, speciesList: species}));
    },
    [dispatch, species],
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

  useEffect(() => {
    const update = async () => {
      if (mapRef.current) {
        try {
          const currentCamera = await mapRef.current.getCamera();
          const {latitude, longitude} = currentCamera.center;
          dispatch(
            requestFetchMapData({
              region: {
                latitude,
                longitude,
                latitudeDelta: 0,
                longitudeDelta: Math.exp(
                  Math.log(360) - (zoomLevel || 16) * Math.LN2,
                ),
              },
              speciesList: species,
            }),
          );
        } catch (e) {
          console.log('map not initialized yet');
        }
      }
    };

    update();
  }, [dispatch, species, zoomLevel]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={NYC_LATLNG}
        mapPadding={{top: 55, left: 0, right: 0, bottom: 0}}
        mapType="terrain"
        minZoomLevel={12}
        moveOnMarkerPress={false}
        onRegionChange={handleRegionChange}
        onPress={handlePress}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        showsUserLocation={true}
        style={styles.map}>
        {ntaRegions}
        {treeMarkers}
        <SelectedTreeMarker />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  speciesSelect: {
    position: 'absolute',
    top: 7,
    width: Dimensions.get('window').width - 24,
    left: 12,
  },
  speciesSelectText: {
    color: '#969fae',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  speciesSelectShadow: {
    width: '100%',
  },
});

export default Map;
