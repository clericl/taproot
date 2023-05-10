import React from 'react';
import {Marker} from 'react-native-maps';
import {TreeDatumType} from '../../utils/types';

const iconRequire = require('../../assets/green-marker.png');

type TreeMarkerProps = {
  treeDatum: TreeDatumType;
};

function TreeMarker({treeDatum}: TreeMarkerProps) {
  return (
    <Marker
      title={treeDatum.species}
      coordinate={treeDatum.location}
      icon={iconRequire}
    />
  );
}

export default TreeMarker;
