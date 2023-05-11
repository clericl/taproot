import {Geometry} from 'geojson';

export type TreeDatumType = {
  id: string;
  species: string;
  condition: string;
  diameter: number;
  location: {
    longitude: number;
    latitude: number;
  };
};

export type NtaDatumType = {
  ntaCode: string;
  ntaName: string;
  geometry: Geometry;
  treeCount: number;
};
