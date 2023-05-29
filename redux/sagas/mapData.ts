import API from '../../api';
import {
  CallEffect,
  call,
  delay,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {LatLng} from 'react-native-maps';
import {
  MapDataRequestType,
  NtaDatumType,
  SpeciesNameType,
  TreePointType,
} from '../../types';
import {PayloadAction} from '@reduxjs/toolkit';
import {calcZoom} from '../../utils/calcZoomLevel';
import {setMapData, setMapDataLoading, setZoomLevel} from '../reducers/mapData';
import {
  fetchMapDataFailed,
  fetchMapDataSuccess,
  requestFetchMapData,
} from '../actions';

const MI_PER_LON_DEGREE = 54.6;

function* typedGetNtaData(
  center: LatLng,
  radius: number,
): Generator<CallEffect<NtaDatumType[]>> {
  const res = yield call(API.getNtaData, center, radius);
  return res;
}

function* typedGetSpeciesData(
  species: SpeciesNameType[],
  center: LatLng,
  radius: number,
): Generator<CallEffect<TreePointType[]>> {
  const res = yield call(API.getSpeciesData, species, center, radius);
  return res;
}

function* typedGetTreePoints(
  center: LatLng,
  radius: number,
): Generator<CallEffect<TreePointType[]>> {
  const res = yield call(API.getTreePoints, center, radius);
  return res;
}

function* fetchMapData(action: PayloadAction<MapDataRequestType>): Generator {
  yield put(setMapDataLoading(true));

  yield delay(400);

  const {region, speciesList} = action.payload;

  const {latitude, longitude, longitudeDelta} = region;
  const searchAreaRadius = longitudeDelta * MI_PER_LON_DEGREE;

  const newZoomLevel = calcZoom(longitudeDelta);

  yield put(setZoomLevel(newZoomLevel));

  try {
    if (speciesList.length) {
      const newData = yield call(
        typedGetSpeciesData,
        speciesList,
        {latitude, longitude},
        searchAreaRadius,
      );

      yield put(fetchMapDataSuccess());
      yield put(setMapData({trees: newData}));
    } else {
      const zoomLevel = (yield select(
        state => state.mapData.zoomLevel,
      )) as number;

      if (zoomLevel > 16) {
        const newData = yield call(
          typedGetTreePoints,
          {latitude, longitude},
          searchAreaRadius,
        );

        yield put(fetchMapDataSuccess());
        yield put(setMapData({trees: newData}));
      } else if (zoomLevel > 10) {
        const newData = yield call(
          typedGetNtaData,
          {latitude, longitude},
          searchAreaRadius * 2,
        );
        yield put(fetchMapDataSuccess());
        yield put(setMapData({ntas: newData}));
      } else {
        yield put(fetchMapDataFailed('no parameters to fetch by'));
        yield put(setMapData({}));
      }
    }
  } catch (e) {
    yield put(fetchMapDataFailed(JSON.stringify(e, null, 2)));
  }

  yield delay(400);

  yield put(setMapDataLoading(false));
}

function* watchRequestMapData() {
  yield takeLatest(requestFetchMapData, fetchMapData);
}

export default watchRequestMapData;
