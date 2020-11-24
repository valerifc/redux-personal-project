// Core
import { apply, put, select } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { pageActions } from "../../../page/actions";
import { todosActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* createTodo ({ payload: todoMessage }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.todos.create, [todoMessage]);
        const { data: todo, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        const page = yield select((state) => state.page.get('page'));
        const size = yield select((state) => state.page.get('size'));
        const total = yield select((state) => state.page.get('total'));
        const search = yield select((state) => state.page.get('search'));

        if (page === 1) {
            yield put(todosActions.createTodo({ todo, size, search }));
            yield put(pageActions.setPage({ total: total + 1 }));
        } else {
            const fetchResponse = yield apply(api, api.todos.fetch, [page, size, search]);
            const { data: todos, fetchMessage, meta } = yield apply(fetchResponse, fetchResponse.json);

            if (response.status !== 200) {
                throw new Error(fetchMessage);
            }

            yield put(todosActions.fetchTodos(todos));
            yield put(pageActions.setPage(meta));
        }
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTodo worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
