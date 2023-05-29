import {PayloadAction} from '@reduxjs/toolkit';
import {all, takeLatest} from 'redux-saga/effects';
import {fetchTreeDetailFailed} from '../actions';
import watchRequestTreeDetail from './treeDetail';
import watchRequestMapData from './mapData';

function* handleError(action: PayloadAction<string>) {
  console.error(action.payload);
}

function* watchHandleError() {
  yield takeLatest(fetchTreeDetailFailed, handleError);
}

function* rootSaga() {
  yield all([
    watchRequestMapData(),
    watchRequestTreeDetail(),
    watchHandleError(),
  ]);
}

export default rootSaga;
