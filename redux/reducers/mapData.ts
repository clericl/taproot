import {NtaDatumType, TreePointType} from '../../types';
import {createSlice} from '@reduxjs/toolkit';

interface MapDataSliceState {
  loading: boolean;
  markerData: {
    ntas: NtaDatumType[];
    trees: TreePointType[];
  };
  zoomLevel: number;
}

const initialState: MapDataSliceState = {
  loading: false,
  markerData: {
    ntas: [],
    trees: [],
  },
  zoomLevel: 12.885657260804033,
};

const mapDataSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    setMapData: (state, action) => {
      const newNtas = action.payload.ntas || [];
      const newTrees = action.payload.trees || [];

      state.markerData = {
        ntas: newNtas,
        trees: newTrees,
      };

      return state;
    },
    setMapDataLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
      return state;
    },
  },
});

export const {setMapData, setMapDataLoading, setZoomLevel} =
  mapDataSlice.actions;

export default mapDataSlice.reducer;
