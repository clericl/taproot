import {LatLng} from 'react-native-maps';
import {API_ENDPOINT} from '@env';
import {TreeDatumType} from './types';

interface RedisTreeDatumType {
  member: string;
  coordinates: {
    longitude: string;
    latitude: string;
  };
}

class API {
  static async getTreeData(
    {latitude, longitude}: LatLng,
    radius = 0.1,
  ): Promise<TreeDatumType[]> {
    const res = await fetch(
      API_ENDPOINT +
        `/trees?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    );
    const body = await res.json();
    const transformed = body.map(
      ({member, coordinates}: RedisTreeDatumType) => {
        const returnObj = JSON.parse(member);
        returnObj.location = {
          longitude: Number(coordinates.longitude),
          latitude: Number(coordinates.latitude),
        };

        return returnObj;
      },
    );

    return transformed;
  }
}

export default API;
