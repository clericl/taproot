import React from 'react';
import {Marker} from 'react-native-maps';
import {TreeDatumType} from '../../utils/types';

type TreeMarkerProps = {
  treeDatum: TreeDatumType;
};

function TreeMarker({treeDatum}: TreeMarkerProps) {
  return <Marker title={treeDatum.species} coordinate={treeDatum.location} />;
}

export default TreeMarker;
