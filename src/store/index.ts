import {applyMiddleware, createStore} from "redux"
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'

import {rootReducer} from "./reducers";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))

const store = createStore(persistedReducer, composedEnhancer)

const persistor = persistStore(store);

export {store, persistor}

