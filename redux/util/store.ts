import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from '../saga';
import treeDetailReducer from '../reducers/treeDetail';
import {configureStore} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
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
