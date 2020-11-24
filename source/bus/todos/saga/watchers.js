// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";

// Workers
import { fetchTodos, createTodo, updateTodo, removeTodo } from "./workers";

export function* watcherFetchTodos () {
    yield takeEvery(types.FETCH_TODOS_ASYNC, fetchTodos);
}

export function* watcherCreateTodo () {
    yield takeEvery(types.CREATE_TODO_ASYNC, createTodo);
}

export function* watcherUpdateTodo () {
    yield takeEvery(types.UPDATE_TODO_ASYNC, updateTodo);
}

export function* watcherRemoveTodo () {
    yield takeEvery(types.REMOVE_TODO_ASYNC, removeTodo);
}

export function* watchTodos () {
    yield all([
        call(watcherFetchTodos),
        call(watcherCreateTodo),
        call(watcherUpdateTodo),
        call(watcherRemoveTodo)
    ]);
}
