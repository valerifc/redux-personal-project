// Core
import { createStore, combineReducers } from 'redux';

// Reducers
import { pageReducer as page } from '../bus/page/reducer';
import { todosReducer as todos } from '../bus/todos/reducer';
import { uiReducer as ui } from '../bus/ui/reducer';

// Store
import { store } from "../store";

export const referenceRootReducer = combineReducers({
    page,
    todos,
    ui,
});

const referenceStore = createStore(referenceRootReducer);

describe('store:', () => {

    test('should have valid state shape', () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
