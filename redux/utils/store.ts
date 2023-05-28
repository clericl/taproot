import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import mapDataReducer from '../reducers/mapData';
import rootSaga from '../sagas';
import treeDetailReducer from '../reducers/treeDetail';
import {configureStore} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    mapData: mapDataReducer,
    treeDetail: treeDetailReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
    logger,
  ],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
