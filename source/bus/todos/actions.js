// Types
import { types } from "./types";

export const todosActions = {
    // Sync
    fetchTodos: (todos) => {
        return {
            type:    types.FETCH_TODOS,
            payload: todos,
        };
    },
    createTodo: (todo) => {
        return {
            type:    types.CREATE_TODO,
            payload: todo,
        };
    },
    updateTodo: (todo) => {
        return {
            type:    types.UPDATE_TODO,
            payload: todo,
        };
    },
    updateTodos: (todos) => {
        return {
            type:    types.UPDATE_TODOS,
            payload: todos,
        };
    },
    updateAllTodos: (todo) => {
        return {
            type:    types.UPDATE_ALL_TODOS,
            payload: todo,
        };
    },
    removeTodo: (todoId) => {
        return {
            type:    types.REMOVE_TODO,
            payload: todoId,
        };
    },

    // Async
    fetchTodosAsync: (queryParams) => {
        return {
            type:    types.FETCH_TODOS_ASYNC,
            payload: queryParams,
        };
    },
    createTodoAsync: (message) => {
        return {
            type:    types.CREATE_TODO_ASYNC,
            payload: message,
        };
    },
    updateTodoAsync: (todo) => {
        return {
            type:    types.UPDATE_TODO_ASYNC,
            payload: todo,
        };
    },
    removeTodoAsync: (todoId) => {
        return {
            type:    types.REMOVE_TODO_ASYNC,
            payload: todoId,
        };
    },
};
