// Actions
import { todosActions } from "../actions";

describe('todos actions:', () => {
    test('fetchTodos', () => {
        expect(todosActions.fetchTodos(__.todos)).toMatchSnapshot();
    });

    test('createTodo', () => {
        expect(todosActions.createTodo(__.todo)).toMatchSnapshot();
    });

    test('updateTodo', () => {
        expect(todosActions.updateTodo(__.todo)).toMatchSnapshot();
    });

    test('updateTodos', () => {
        expect(todosActions.updateTodos(__.todos)).toMatchSnapshot();
    });

    test('updateAllTodos', () => {
        expect(todosActions.updateAllTodos(__.todo)).toMatchSnapshot();
    });

    test('removeTodo', () => {
        expect(todosActions.removeTodo(__.todoId)).toMatchSnapshot();
    });

    test('fetchTodosAsync', () => {
        expect(todosActions.fetchTodosAsync(__.queryParams)).toMatchSnapshot();
    });

    test('createTodoAsync', () => {
        expect(todosActions.createTodoAsync(__.message)).toMatchSnapshot();
    });

    test('updateTodoAsync', () => {
        expect(todosActions.updateTodoAsync(__.todo)).toMatchSnapshot();
    });

    test('removeTodoAsync', () => {
        expect(todosActions.removeTodoAsync(__.todoId)).toMatchSnapshot();
    });
});
