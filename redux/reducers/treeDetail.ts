import {createSlice} from '@reduxjs/toolkit';
import {TreeDetailType} from '../../utils/types';

interface TreeDetailSliceState {
  loading: boolean;
  data: TreeDetailType;
}

const initialState: TreeDetailSliceState = {
  loading: false,
  data: null,
};

const treeDetailSlice = createSlice({
  name: 'treeDetail',
  initialState,
  reducers: {
    setTreeDetailLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
    setTreeDetailData: (state, action) => {
      state.data = Object.assign({}, action.payload);
      return state;
    },
    clearTreeDetailData: state => {
      state.data = null;
      return state;
    },
  },
});

export const {setTreeDetailLoading, setTreeDetailData, clearTreeDetailData} =
  treeDetailSlice.actions;

export default treeDetailSlice.reducer;
