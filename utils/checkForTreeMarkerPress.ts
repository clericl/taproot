import {getDistance} from 'geolib';
import {LatLng} from 'react-native-maps';
import {TreePointType} from '../types';

function checkForTreeMarkerPress(
  treeData: TreePointType[],
  pressCoords: LatLng,
  zoomLevel: number,
) {
  const zoomMultiplier = Math.pow(16 / zoomLevel, 11) + 0.35;

  for (const treeDatum of treeData) {
    const distanceBetween = getDistance(treeDatum.location, pressCoords);
    if (
      distanceBetween <
      (4 + Math.sqrt(treeDatum.diameter)) * zoomMultiplier
    ) {
      return treeDatum;
    }
  }
}

export default checkForTreeMarkerPress;
