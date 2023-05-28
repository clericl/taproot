import {createSlice} from '@reduxjs/toolkit';

const mapDataSlice = createSlice({
  name: 'mapData',
  initialState: {
    loading: false,
    markerData: {
      ntas: [],
      trees: [],
    },
  },
  reducers: {
    setMarkerData: (state, action) => {
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
  },
});

export const {setMarkerData, setMapDataLoading} = mapDataSlice.actions;

export default mapDataSlice.reducer;
