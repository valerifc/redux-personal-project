// Core
import { fromJS, List } from "immutable";

// Types
import { types } from "./types";

const initialState = List();

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TODOS:
            return fromJS(action.payload);

        case types.CREATE_TODO:
            return state
                .unshift(fromJS(action.payload.todo))
                .filter((todo) => todo.get("message").indexOf(action.payload.search || '') !== -1)
                .slice(0, action.payload.size);

        case types.UPDATE_TODO:
            return state.update(
                state.findIndex((todo) => {
                    return todo.get('id') === action.payload.id;
                }),
                (todo) => {
                    return fromJS({ ...todo.toJSON(), ...action.payload });
                });

        case types.UPDATE_TODOS:
            return state.map((todo) => {
                const todoJSON = todo.toJSON();
                const index = action.payload.findIndex(
                    (todoPayload) => todoPayload.id === todoJSON.id
                );

                if (index !== -1) {
                    return fromJS({ ...todoJSON, ...action.payload[index] });
                }

                return todo;
            });

        case types.UPDATE_ALL_TODOS:
            return state.map(
                (todo) => fromJS({ ...todo.toJSON(), ...action.payload })
            );

        case types.REMOVE_TODO:
            return state.filter(
                (todo) => todo.get("id") !== action.payload.todoId
            );

        default: return state;
    }
};
