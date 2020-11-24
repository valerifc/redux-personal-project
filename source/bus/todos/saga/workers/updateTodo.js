// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { todosActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* updateTodo ({ payload: todos }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.todos.update, [todos]);
        const { data: updatedTodos, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(todosActions.updateTodos(updatedTodos));
    } catch (error) {
        yield put(uiActions.emitError(error, 'updateTodo worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
