import {createSlice} from '@reduxjs/toolkit';

const initialDataState = {
  tree_id: null,
  block_id: null,
  created_at: null,
  tree_dbh: null,
  stump_diam: null,
  curb_loc: null,
  status: null,
  health: null,
  spc_latin: null,
  spc_common: null,
  steward: null,
  guards: null,
  sidewalk: null,
  user_type: null,
  problems: null,
  root_stone: null,
  root_grate: null,
  root_other: null,
  trunk_wire: null,
  trnk_light: null,
  trnk_other: null,
  brch_light: null,
  brch_shoe: null,
  brch_other: null,
  address: null,
  postcode: null,
  zip_city: null,
  community_board: null,
  borocode: null,
  borough: null,
  cncldist: null,
  st_assem: null,
  st_senate: null,
  nta: null,
  nta_name: null,
  boro_ct: null,
  state: null,
  latitude: null,
  longitude: null,
  x_sp: null,
  y_sp: null,
  council_district: null,
  census_tract: null,
  bin: null,
  bbl: null,
};

const treeDetailSlice = createSlice({
  name: 'treeDetail',
  initialState: {
    loading: false,
    data: Object.assign({}, initialDataState),
  },
  reducers: {
    setTreeDetailLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
    setTreeDetailData: (state, action) => {
      state.data = Object.assign({}, state.data, action.payload);
      return state;
    },
    clearTreeDetailData: state => {
      state.data = Object.assign({}, initialDataState);
      return state;
    },
  },
});

export const {setTreeDetailLoading, setTreeDetailData, clearTreeDetailData} =
  treeDetailSlice.actions;

export default treeDetailSlice.reducer;
