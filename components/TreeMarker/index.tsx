import React, {useMemo} from 'react';
import {Circle} from 'react-native-maps';
import {TreePointType} from '../../utils/types';
import {SpeciesDetailsType} from '../../utils/types';

import _speciesDetails from '../../data/speciesDetails.json';

type TreeMarkerProps = {
  selected?: boolean;
  treeDatum: TreePointType;
  zoomLevel: number;
};

const speciesDetails: SpeciesDetailsType = _speciesDetails;

function TreeMarker({selected = false, treeDatum, zoomLevel}: TreeMarkerProps) {
  const zoomMultiplier = useMemo(
    () => Math.pow(16 / zoomLevel, 11) + 0.35,
    [zoomLevel],
  );

  return (
    <Circle
      center={treeDatum.location}
      radius={
        (selected ? 8 : 4 + Math.sqrt(treeDatum.diameter)) * zoomMultiplier
      }
      strokeColor={selected ? 'rgba(55, 55, 55, 0.5)' : 'rgb(255, 255, 255)'}
      strokeWidth={selected ? 8 : 1}
      zIndex={2}
      fillColor={
        selected
          ? 'rgba(0, 0, 0, 0)'
          : speciesDetails[treeDatum.species.replaceAll('_', ' ')]?.color ||
            'rgba(0, 0, 0, 0.5)'
      }
    />
  );
}

export default TreeMarker;
