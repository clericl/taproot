import React, {useMemo} from 'react';
import hslToRgb from '../../utils/hslToRgb';
import {Geojson} from 'react-native-maps';
import {GeoJSON} from 'geojson';
import {NtaDatumType} from '../../utils/types';

type NtaRegionProps = {
  ntaDatum: NtaDatumType;
};

const HIGHEST_COUNT = 14000; // 12969

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

  const [r, g, b] = hslToRgb(
    138 / 360,
    ntaDatum.treeCount / HIGHEST_COUNT + 0.5,
    0.27,
  );

  return (
    <>
      <Geojson
        geojson={featureCollection}
        fillColor={`rgba(${r}, ${g}, ${b}, 0.6)`}
        title={ntaDatum.ntaName}
        tracksViewChanges={false}
      />
    </>
  );
}

export default NtaRegion;
