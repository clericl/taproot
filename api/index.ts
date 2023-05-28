import {LatLng} from 'react-native-maps';
import {API_ENDPOINT} from '@env';
import {
  NtaDatumType,
  SpeciesNameType,
  TreeDetailType,
  TreePointType,
} from '../types';

interface RedisGeoSearchType {
  member: string;
  coordinates: {
    longitude: string;
    latitude: string;
  };
}

class API {
  static async getTreePoints(
    {latitude, longitude}: LatLng,
    radius = 0.1,
  ): Promise<TreePointType[]> {
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
      throw new Error(message);
    }
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
      throw new Error(message);
    }
  }

  static async getSpeciesData(
    species: SpeciesNameType[],
    {latitude, longitude}: LatLng,
    radius = 0.1,
  ): Promise<TreePointType[]> {
    const speciesString = species
      .map((speciesItem: SpeciesNameType) => speciesItem.id)
      .join(',');

    const res = await fetch(
      API_ENDPOINT +
        `/species?species=${speciesString}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    );
    if (res.status < 400) {
      const body = await res.json();

      species.forEach((speciesItem, index) => {
        body[index].forEach((item: any) => {
          item.scientificName = speciesItem.id;
        });
      });

      const transformed = body
        .flat()
        .map(({member, coordinates, scientificName}: any) => {
          const returnObj = JSON.parse(member);
          returnObj.location = {
            longitude: Number(coordinates.longitude),
            latitude: Number(coordinates.latitude),
          };
          returnObj.species = scientificName;

          return returnObj;
        });
      return transformed;
    } else {
      const message = await res.text();
      throw new Error(message);
    }
  }

  static async getTreeDetail(id: number): Promise<TreeDetailType> {
    const res = await fetch(API_ENDPOINT + `/tree/${id}`);

    if (res.status < 400) {
      const body = await res.json();
      return body;
    } else {
      const message = await res.text();
      throw new Error(message);
    }
  }
}

export default API;
