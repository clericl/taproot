import React from 'react';
import {Circle} from 'react-native-maps';
import {TreeDatumType} from '../../utils/types';

import _speciesColors from '../../utils/speciesColors.json';

interface SpeciesColor {
  [key: string]: string;
}

type TreeMarkerProps = {
  treeDatum: TreeDatumType;
};

const speciesColors: SpeciesColor = _speciesColors;

function TreeMarker({treeDatum}: TreeMarkerProps) {
  return (
    <Circle
      center={treeDatum.location}
      radius={4 + treeDatum.diameter / 4}
      strokeColor="rgb(255, 255, 255)"
      fillColor={
        speciesColors[treeDatum.species.replaceAll('_', ' ')] ||
        'rgba(0, 0, 0, 0.5)'
      }
    />
  );
}

export default TreeMarker;
