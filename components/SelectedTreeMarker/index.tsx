import React, {useMemo} from 'react';
import {Circle} from 'react-native-maps';
import {useAppSelector} from '../../redux/utils/hooks';

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
        strokeColor={'rgba(55, 55, 55, 0.5)'}
        strokeWidth={8}
        zIndex={2}
        fillColor={'rgba(0, 0, 0, 0)'}
      />
    )
  );
}

export default SelectedTreeMarker;
