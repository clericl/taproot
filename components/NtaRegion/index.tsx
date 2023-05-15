import React, {useMemo} from 'react';
import {Geojson, Marker} from 'react-native-maps';
import {GeoJSON} from 'geojson';
import {NtaDatumType} from '../../utils/types';
import {StyleSheet, Text} from 'react-native';

type NtaRegionProps = {
  ntaDatum: NtaDatumType;
};

function NtaRegion({ntaDatum}: NtaRegionProps) {
  const featureCollection: GeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: ntaDatum.geometry,
        },
      ],
    }),
    [ntaDatum.geometry],
  );

  return (
    <>
      <Geojson
        geojson={featureCollection}
        fillColor="rgba(0, 138, 41, 0.5)"
        title={ntaDatum.ntaName}
        tracksViewChanges={false}
      />
      <Marker anchor={{x: 0.5, y: 0.5}} coordinate={ntaDatum.center}>
        <Text style={styles.text}>{ntaDatum.ntaName}</Text>
        <Text style={styles.text}>{ntaDatum.treeCount}</Text>
      </Marker>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
  },
});

export default NtaRegion;
