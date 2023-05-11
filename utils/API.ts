import {LatLng} from 'react-native-maps';
import {API_ENDPOINT} from '@env';
import {NtaDatumType, TreeDatumType} from './types';

interface RedisGeoSearchType {
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
    if (res.status < 400) {
      const body = await res.json();
      const transformed = body.map(
        ({member, coordinates}: RedisGeoSearchType) => {
          const returnObj = JSON.parse(member);
          returnObj.location = {
            longitude: Number(coordinates.longitude),
            latitude: Number(coordinates.latitude),
          };

          return returnObj;
        },
      );
      return transformed;
    } else {
      const message = await res.text();
      console.log(message);
    }
    return [];
  }

  static async getNtaData(
    {latitude, longitude}: LatLng,
    radius = 0.1,
  ): Promise<NtaDatumType[]> {
    const res = await fetch(
      API_ENDPOINT +
        `/ntas?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    );
    if (res.status < 400) {
      const body = await res.json();
      const transformed = body.map(
        ({member, coordinates}: RedisGeoSearchType) => {
          const returnObj = JSON.parse(member);
          returnObj.center = {
            longitude: Number(coordinates.longitude),
            latitude: Number(coordinates.latitude),
          };

          return returnObj;
        },
      );
      return transformed;
    } else {
      const message = await res.text();
      console.log(message);
    }
    return [];
  }
}

export default API;
