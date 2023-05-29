import React, {useMemo} from 'react';
import {Circle} from 'react-native-maps';
import {TreePointType} from '../../types';
import {SpeciesDetailsType} from '../../types';
import {useAppSelector} from '../../redux/utils/hooks';

import _speciesDetails from '../../data/speciesDetails.json';

type TreeMarkerProps = {
  treeDatum: TreePointType;
};

const speciesDetails: SpeciesDetailsType = _speciesDetails;

function TreeMarker({treeDatum}: TreeMarkerProps) {
  const zoomLevel = useAppSelector(state => state.mapData.zoomLevel);

  const zoomMultiplier = useMemo(
    () => Math.pow(16 / zoomLevel, 11) + 0.35,
    [zoomLevel],
  );

  return (
    <Circle
      center={treeDatum.location}
      radius={(4 + Math.sqrt(treeDatum.diameter)) * zoomMultiplier}
      strokeColor="rgb(255, 255, 255)"
      strokeWidth={1}
      zIndex={2}
      fillColor={
        speciesDetails[treeDatum.species.replaceAll('_', ' ')]?.color ||
        'rgba(0, 0, 0, 0.5)'
      }
    />
  );
}

export default TreeMarker;
