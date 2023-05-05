import React from 'react';
import {Text, View} from 'react-native';
import {TreeDatumType} from '../../utils/types';

type TreeMarkerProps = {
  treeDatum: TreeDatumType;
};

function TreeMarker({treeDatum}: TreeMarkerProps) {
  return (
    <View>
      <Text>{JSON.stringify(treeDatum)}</Text>
    </View>
  );
}

export default TreeMarker;
