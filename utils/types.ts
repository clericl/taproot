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
