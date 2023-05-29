import {createAction} from '@reduxjs/toolkit';
import {MapDataRequestType} from '../../types';

export const requestFetchTreeDetail = createAction<number>(
  'treeDetail/requestFetchTreeDetail',
);
export const fetchTreeDetailSuccess = createAction(
  'treeDetail/fetchTreeDetailSuccess',
);
export const fetchTreeDetailFailed = createAction<string>(
  'treeDetail/fetchTreeDetailFailed',
);

export const requestFetchMapData = createAction<MapDataRequestType>(
  'mapData/requestFetchMapData',
);
export const fetchMapDataSuccess = createAction('mapData/fetchMapDataSuccess');
export const fetchMapDataFailed = createAction<string>(
  'mapData/fetchMapDataFailed',
);
