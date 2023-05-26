import {createAction} from '@reduxjs/toolkit';

export const requestFetchTreeDetail = createAction<number>(
  'treeDetail/requestFetchTreeDetail',
);
export const fetchTreeDetailSuccess = createAction(
  'treeDetail/fetchTreeDetailSuccess',
);
export const fetchTreeDetailFailed = createAction<string>(
  'treeDetail/fetchTreeDetailFailed',
);
