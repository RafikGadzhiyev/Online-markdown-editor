import { applyMiddleware, legacy_createStore as CreateStore } from 'redux';
import logger from 'redux-logger';
import { MainReducer } from './reducers/main.reducer';

export const store = CreateStore(MainReducer, applyMiddleware(logger));