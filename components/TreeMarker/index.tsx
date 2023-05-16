import React, {useMemo} from 'react';
import {Circle} from 'react-native-maps';
import {TreeDatumType} from '../../utils/types';
import {SpeciesColor} from '../../utils/types';

import _speciesColors from '../../data/speciesColors.json';

type TreeMarkerProps = {
  treeDatum: TreeDatumType;
  zoomLevel: number;
};

const speciesColors: SpeciesColor = _speciesColors;

function TreeMarker({treeDatum, zoomLevel}: TreeMarkerProps) {
  const zoomMultiplier = useMemo(
    () => Math.pow(16 / zoomLevel, 11) + 0.5,
    [zoomLevel],
  );

  return (
    <Circle
      center={treeDatum.location}
      radius={(4 + treeDatum.diameter / 4) * zoomMultiplier}
      strokeColor="rgb(255, 255, 255)"
      fillColor={
        speciesColors[treeDatum.species.replaceAll('_', ' ')] ||
        'rgba(0, 0, 0, 0.5)'
      }
    />
  );
}

export default TreeMarker;
