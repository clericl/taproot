import React from 'react';
import {Marker} from 'react-native-maps';
import {TreeDatumType} from '../../utils/types';

const iconSmall = require('../../assets/green-marker-small.png');

type TreeMarkerProps = {
  treeDatum: TreeDatumType;
};

function TreeMarker({treeDatum}: TreeMarkerProps) {
  return (
    <Marker
      title={treeDatum.species}
      coordinate={treeDatum.location}
      icon={iconSmall}
    />
  );
}

export default TreeMarker;
