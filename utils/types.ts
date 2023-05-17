import {Geometry} from 'geojson';
import {ReactNode} from 'react';

export type TreeDatumType = {
  id: number;
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
  center: {
    longitude: number;
    latitude: number;
  };
};

export type SpeciesNameType = {
  id: string;
  title: string;
};

export type ControllerProps = {
  children: ReactNode;
};

export interface SpeciesColor {
  [key: string]: string;
}
