// Core
import { combineReducers } from 'redux';

// Reducers
import { pageReducer as page } from '../bus/page/reducer';
import { todosReducer as todos } from '../bus/todos/reducer';
import { uiReducer as ui } from '../bus/ui/reducer';

export const rootReducer = combineReducers({
    page,
    todos,
    ui,
});
