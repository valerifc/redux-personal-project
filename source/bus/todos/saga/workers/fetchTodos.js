// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { pageActions } from "../../../page/actions";
import { todosActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* fetchTodos ({ payload: { page, size, search }}) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.todos.fetch, [page, size, search]);
        const { data: todos, message, meta } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(todosActions.fetchTodos(todos));
        yield put(pageActions.setPage(meta));
    } catch (error) {
        yield put(uiActions.emitError(error, 'fetchTodos worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
