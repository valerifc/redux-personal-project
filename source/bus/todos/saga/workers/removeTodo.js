// Core
import { put, apply, select } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { pageActions } from "../../../page/actions";
import { todosActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* removeTodo ({ payload: todoId }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.todos.remove, [todoId]);

        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        const page = yield select((state) => state.page.get('page'));
        const size = yield select((state) => state.page.get('size'));
        const total = yield select((state) => state.page.get('total'));
        const search = yield select((state) => state.page.get('search'));

        const pageLast = Math.ceil(total / size) || 1;

        if (page > 1 && page === pageLast) {
            if (total - (page - 1) * size > 1) {
                yield put(todosActions.removeTodo({ todoId }));
                yield put(pageActions.setPage({ total: total - 1 }));
            } else {
                const fetchResponse = yield apply(api, api.todos.fetch, [page - 1, size, search]);
                const { data: todos, meta } = yield apply(fetchResponse, fetchResponse.json);

                yield put(todosActions.fetchTodos(todos));
                yield put(pageActions.setPage(meta));
            }
        } else {
            const fetchResponse = yield apply(api, api.todos.fetch, [page, size, search]);
            const { data: todos, meta } = yield apply(fetchResponse, fetchResponse.json);

            yield put(todosActions.fetchTodos(todos));
            yield put(pageActions.setPage(meta));
        }
    } catch (error) {
        yield put(uiActions.emitError(error, 'removeTodo worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
