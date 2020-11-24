// Core
import { fromJS, Map } from "immutable";

// Types
import { types } from "./types";

const initialState = Map({
    total:        0,
    page:         1,
    size:         5,
    search:       '',
    allCompleted: false,
    newTodoText:  '',
});

export const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PAGE:
            return fromJS({ ...state.toJSON(), ...action.payload });

        default: return state;
    }
};
