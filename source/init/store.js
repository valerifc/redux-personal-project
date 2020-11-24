// Core
import { createStore } from 'redux';

// Roots
import { rootReducer } from './rootReducer';
import { rootSaga } from "./rootSaga";

// Middleware
import { enchancedStore, sagaMiddleware } from "./middleware/core";

export const store = createStore(rootReducer, enchancedStore);

sagaMiddleware.run(rootSaga);
