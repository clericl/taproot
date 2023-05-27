import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as Location from 'expo-location';
import API from '../../utils/API';
import MapLoading from '../MapLoading';
import MapView, {
  MapPressEvent,
  Region,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import NtaRegion from '../NtaRegion';
import SelectedTreeMarker from '../SelectedTreeMarker';
import TreeMarker from '../TreeMarker';
import asyncDebounce from '../../utils/debounceAsync';
import checkForTreeMarkerPress from '../../utils/checkForTreeMarkerPress';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FilterContext} from '../FilterController';
import {NtaDatumType, SpeciesNameType, TreePointType} from '../../utils/types';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {clearTreeDetailData} from '../../redux/reducers/treeDetail';
import {requestFetchTreeDetail} from '../../redux/actions';
import {useDispatch} from 'react-redux';

const NYC_LATLNG = {
  latitude: 40.7128,
  longitude: -73.9872,
  latitudeDelta: 0,
  longitudeDelta: 0.04757,
};

const MI_PER_LON_DEGREE = 54.6;

const calcZoom = (delta: number) => Math.log(360 / delta) / Math.LN2;
const calcDelta = (zoom: number) => 360 / Math.pow(Math.E, zoom * Math.LN2);

type MarkerStateType = {
  ntas: NtaDatumType[];
  trees: TreePointType[];
};

function Map() {
  const [loading, setLoading] = useState(false);
  const [markerData, setMarkerData] = useState<MarkerStateType>({
    ntas: [],
    trees: [],
  });
  const {species} = useContext(FilterContext);
  const dispatch = useDispatch();
  const mapRef = useRef<MapView>(null);
  const zoomLevel = useRef(calcZoom(NYC_LATLNG.longitudeDelta));

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
      rendered.push(
        <TreeMarker
          key={treeDatum.id}
          treeDatum={treeDatum}
          zoomLevel={zoomLevel.current}
        />,
      );
    }

    return rendered;
  }, [markerData, zoomLevel]);

  const handlePress = useCallback(
    (pressEvent: MapPressEvent) => {
      const coords = pressEvent.nativeEvent.coordinate;
      const pressedMarker = checkForTreeMarkerPress(
        markerData.trees,
        coords,
        zoomLevel.current,
      );

      if (pressedMarker) {
        dispatch(clearTreeDetailData());
        dispatch(requestFetchTreeDetail(pressedMarker.id));

        if (mapRef.current) {
          mapRef.current.animateCamera({
            center: {
              latitude: coords.latitude - calcDelta(zoomLevel.current) / 1.75,
              longitude: coords.longitude,
            },
          });
        }
      }
    },
    [dispatch, markerData.trees],
  );

  const updateMarkers = useRef(
    asyncDebounce(async (newRegion: Region, newSpecies: SpeciesNameType[]) => {
      const {latitude, longitude, longitudeDelta} = newRegion;
      const searchAreaRadius = longitudeDelta * MI_PER_LON_DEGREE;

      zoomLevel.current = calcZoom(longitudeDelta);

      try {
        if (newSpecies.length) {
          const newData = await API.getSpeciesData(
            newSpecies,
            {latitude, longitude},
            searchAreaRadius,
          );
          setMarkerData({
            ntas: [],
            trees: newData,
          });
        } else {
          if (zoomLevel.current > 16) {
            const newData = await API.getTreePoints(
              {latitude, longitude},
              searchAreaRadius,
            );
            setMarkerData({
              ntas: [],
              trees: newData,
            });
          } else if (zoomLevel.current > 10) {
            const newData = await API.getNtaData(
              {latitude, longitude},
              searchAreaRadius * 2,
            );
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
        }
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    }, 400),
  ).current;

  const handleRegionChange = useCallback(
    (newRegion: Region) => {
      setLoading(true);
      updateMarkers(newRegion, species);
    },
    [species, updateMarkers],
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
          await updateMarkers(
            {
              latitude,
              longitude,
              latitudeDelta: 0,
              longitudeDelta: Math.exp(
                Math.log(360) - (zoomLevel.current || 16) * Math.LN2,
              ),
            },
            species,
          );
        } catch (e) {
          console.log('map not initialized yet');
        }
      }
    };

    update();
  }, [species, updateMarkers]);

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
        <SelectedTreeMarker zoomLevel={zoomLevel.current} />
      </MapView>
      <MapLoading loading={loading} />
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
