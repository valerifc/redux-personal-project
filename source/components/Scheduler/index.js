// Core
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Instruments
import Styles from "./styles.m.css";
import { pageActions } from "../../bus/page/actions";
import { todosActions } from "../../bus/todos/actions";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Task from "../Task";
import Pagination from "../Pagination";

const Scheduler = () => {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.todos).sort((a, b) => {
        if (a.get("completed") && !b.get("completed")) {

            return 1;
        } else if (!a.get("completed") && b.get("completed")) {
            return -1;
        }

        if (a.get("favorite") && !b.get("favorite")) {
            return -1;
        }

        return 1;
    });

    const page = useSelector((state) => state.page.get("page"));
    const size = useSelector((state) => state.page.get("size"));
    const search = useSelector((state) => state.page.get("search"));

    const newTodoText = useSelector((state) => state.page.get("newTodoText")) || '';

    useEffect(() => {
        dispatch(todosActions.fetchTodosAsync({ page, size, search }));
    }, []);

    const performSearch = (e) => {
        dispatch(pageActions.setPage({ search: e.target.value }));
        dispatch(todosActions.fetchTodosAsync({ page: 1, size, search: e.target.value }));
    };

    const setNewTodoText = (e) => {
        dispatch(pageActions.setPage({ newTodoText: e.target.value }));
    };

    const createTodo = (e) => {
        if (newTodoText) {
            dispatch(todosActions.createTodoAsync(newTodoText));
        }

        dispatch(pageActions.setPage({ newTodoText: '' }));
        e.preventDefault();
    };

    const setAllCompleted = () => {
        if (todos.some((todo) => !todo.get('completed'))) {
            dispatch(todosActions.updateTodoAsync(todos
                .map((todo) => {
                    return { ...todo.toJSON(), completed: true };
                })
            ));
        }
    };

    const todoList =
    (<TransitionGroup>
        {todos.map((task, index) =>
            (<CSSTransition
                classNames = { "fade" }
                key = { index }
                timeout = { 100 }>
                <Task
                    className = { Styles.fadeenterdone }
                    completed = { task.get("completed") }
                    editedMessage = { task.get("editedMessage") }
                    editing = { task.get("editing") }
                    favorite = { task.get("favorite") }
                    id = { task.get("id") }
                    message = { task.get("message") }
                    { ...task }
                />
            </CSSTransition>)
        )}
    </TransitionGroup>);

    return (
        <section className = { Styles.scheduler }>
            <main>
                <header>
                    <h1>Планировщик задач</h1>
                    <input
                        placeholder = 'Поиск'
                        type = 'search'
                        value = { search }
                        onChange = { performSearch }
                    />
                </header>
                <section>
                    <form>
                        <input
                            className = { Styles.createTask }
                            maxLength = { 50 }
                            placeholder = 'Описание моей новой задачи'
                            type = 'text'
                            value = { newTodoText }
                            onChange = { setNewTodoText }
                        />
                        <button onClick = { createTodo }>
                            Добавить задачу
                        </button>
                    </form>
                    <div className = { Styles.overlay }>
                        <ul>{todoList}</ul>
                    </div>
                </section>
                <footer>
                    <Checkbox
                        checked = { !todos.some((todo) => !todo.get("completed")) }
                        color1 = '#363636'
                        color2 = '#fff'
                        onClick = { setAllCompleted }
                    />
                    <span className = { Styles.completeAllTasks }>
                        Все задачи выполнены
                    </span>
                    <Pagination />
                </footer>
            </main>
        </section>
    );
};

export default Scheduler;
