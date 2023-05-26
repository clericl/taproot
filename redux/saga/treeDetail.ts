import API from '../../utils/API';
import {PayloadAction} from '@reduxjs/toolkit';
import {CallEffect, call, put, takeLatest} from 'redux-saga/effects';
import {TreeDetailType} from '../../utils/types';
import {
  fetchTreeDetailFailed,
  fetchTreeDetailSuccess,
  requestFetchTreeDetail,
} from '../actions';
import {setTreeDetailData, setTreeDetailLoading} from '../reducers/treeDetail';

function* typedGetTreeDetail(
  id: number,
): Generator<CallEffect<TreeDetailType>> {
  const res = yield call(API.getTreeDetail, id);
  return res;
}

function* fetchTreeDetail(action: PayloadAction<number>): Generator {
  yield put(setTreeDetailLoading(true));

  try {
    const res = yield typedGetTreeDetail(action.payload);

    yield put(fetchTreeDetailSuccess());
    yield put(setTreeDetailData(res as TreeDetailType));
  } catch (e) {
    yield put(fetchTreeDetailFailed(JSON.stringify(e, null, 2)));
  }

  yield put(setTreeDetailLoading(false));
}

function* watchRequestTreeDetail() {
  yield takeLatest(requestFetchTreeDetail, fetchTreeDetail);
}

export default watchRequestTreeDetail;
