import React, {useMemo} from 'react';
import {Circle} from 'react-native-maps';
import {TreePointType} from '../../utils/types';
import {SpeciesDetailsType} from '../../utils/types';

import _speciesDetails from '../../data/speciesDetails.json';

type TreeMarkerProps = {
  treeDatum: TreePointType;
  zoomLevel: number;
};

const speciesDetails: SpeciesDetailsType = _speciesDetails;

function TreeMarker({treeDatum, zoomLevel}: TreeMarkerProps) {
  const zoomMultiplier = useMemo(
    () => Math.pow(16 / zoomLevel, 11) + 0.35,
    [zoomLevel],
  );

  return (
    <Circle
      center={treeDatum.location}
      radius={(4 + Math.sqrt(treeDatum.diameter)) * zoomMultiplier}
      strokeColor="rgb(255, 255, 255)"
      zIndex={1}
      fillColor={
        speciesDetails[treeDatum.species.replaceAll('_', ' ')]?.color ||
        'rgba(0, 0, 0, 0.5)'
      }
    />
  );
}

export default TreeMarker;
