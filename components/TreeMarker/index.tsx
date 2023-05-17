import React, {useMemo} from 'react';
import {Circle} from 'react-native-maps';
import {TreeDatumType} from '../../utils/types';
import {SpeciesDetail} from '../../utils/types';

import _speciesDetails from '../../data/speciesDetails.json';

type TreeMarkerProps = {
  treeDatum: TreeDatumType;
  zoomLevel: number;
};

const speciesDetails: SpeciesDetail = _speciesDetails;

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
