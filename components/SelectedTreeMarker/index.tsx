import React, {useMemo} from 'react';
import {Circle} from 'react-native-maps';
import {SpeciesDetailsType} from '../../types';
import {useAppSelector} from '../../redux/utils/hooks';

import _speciesDetails from '../../data/speciesDetails.json';

const speciesDetails: SpeciesDetailsType = _speciesDetails;

function SelectedTreeMarker() {
  const treeDetailData = useAppSelector(state => state.treeDetail.data);
  const zoomLevel = useAppSelector(state => state.mapData.zoomLevel);

  const diameter = useMemo(() => {
    if (treeDetailData) {
      const {tree_dbh, stump_diam} = treeDetailData;
      if (tree_dbh) {
        return tree_dbh;
      } else if (stump_diam) {
        return stump_diam;
      }
    }

    return 0;
  }, [treeDetailData]);

  const zoomMultiplier = useMemo(
    () => Math.pow(16 / zoomLevel, 11) + 0.35,
    [zoomLevel],
  );

  return (
    treeDetailData && (
      <Circle
        center={{
          latitude: treeDetailData.latitude,
          longitude: treeDetailData.longitude,
        }}
        radius={(8 + Math.sqrt(diameter)) * zoomMultiplier}
        strokeColor={'rgba(32, 47, 250, 0.5)'}
        strokeWidth={8}
        zIndex={4}
        fillColor={
          zoomLevel < 16
            ? speciesDetails[treeDetailData.spc_latin]?.color ||
              'rgba(0, 0, 0, 0.5)'
            : 'rgba(0, 0, 0, 0)'
        }
      />
    )
  );
}

export default SelectedTreeMarker;
