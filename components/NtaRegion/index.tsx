import React, {useMemo} from 'react';
import {Geojson} from 'react-native-maps';
import {NtaDatumType} from '../../utils/types';
import {GeoJSON} from 'geojson';

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
    <Geojson
      geojson={featureCollection}
      fillColor="rgba(0, 138, 41, 0.5)"
      title={ntaDatum.ntaName}
      tracksViewChanges={false}
    />
  );
}

export default NtaRegion;
