// Types
import { todosReducer } from "../reducer";

// Actions
import { todosActions } from "../actions";

describe("todos reducer:", () => {
    test("should return initial state by default", () => {
        expect(todosReducer(void 0, {})).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle FETCH_TODOS action", () => {
        expect(todosReducer(void 0, todosActions.fetchTodos(__.todos)))
            .toMatchInlineSnapshot(`
Immutable.List [
  Immutable.Map {
    "id": "5a7f136231a5d90001271637",
    "message": "Hello Andrey!",
    "completed": true,
    "favorite": false,
    "created": "2018-02-10T15:44:34.624Z",
    "modified": "2018-02-10T16:01:12.406Z",
  },
  Immutable.Map {
    "id": "5a7f136131a5d90001271636",
    "message": "Hello",
    "completed": false,
    "favorite": false,
    "created": "2018-02-10T15:44:33.675Z",
  },
  Immutable.Map {
    "id": "5a7f136031a5d90001271635",
    "message": "Hello",
    "completed": false,
    "favorite": false,
    "created": "2018-02-10T15:44:32.959Z",
  },
]
`);
    });

    test("should handle CREATE_TODO action", () => {
        expect(
            todosReducer(void 0, todosActions.createTodo(__.todoWithPage))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle UPDATE_TODO action", () => {
        expect(todosReducer(void 0, todosActions.updateTodo(__.todo)))
            .toMatchInlineSnapshot(`
Immutable.List [
  Immutable.Map {
    "id": "5a7f136031a5d90001271635",
    "message": "Hello",
    "completed": false,
    "favorite": false,
    "created": "2018-02-10T15:44:32.959Z",
  },
]
`);
    });

    test("should handle UPDATE_TODOS action", () => {
        expect(
            todosReducer(void 0, todosActions.updateTodos(__.todos))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle UPDATE_ALL_TODOS action", () => {
        expect(
            todosReducer(void 0, todosActions.updateAllTodos(__.todo))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle REMOVE_TODO action", () => {
        expect(
            todosReducer(void 0, todosActions.removeTodo(__.todoId))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle FETCH_TODOS_ASYNC action", () => {
        expect(
            todosReducer(void 0, todosActions.fetchTodosAsync(__.queryParams))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle CREATE_TODO_ASYNC action", () => {
        expect(
            todosReducer(void 0, todosActions.createTodoAsync(__.message))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle UPDATE_TODO_ASYNC action", () => {
        expect(
            todosReducer(void 0, todosActions.updateTodoAsync(__.todo))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle REMOVE_TODO_ASYNC action", () => {
        expect(
            todosReducer(void 0, todosActions.removeTodoAsync(__.todoId))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });
});
