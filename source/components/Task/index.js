// Core
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';

// Instruments
import { todosActions } from '../../bus/todos/actions';
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

const Task = ({ id, message, editedMessage, completed, favorite, editing }) => {
    const dispatch = useDispatch();
    const ref = useRef();
    const styles = cx(Styles.task, {
        [Styles.completed]: completed,
    });

    useEffect(() => {
        if (editing) {
            ref.current.focus();
        }
    }, [editing]);

    const edit = (preventUpdate) => {
        if (editing) {
            if (!preventUpdate) {
                dispatch(todosActions.updateTodoAsync([{
                    id,
                    message:   editedMessage,
                    completed: completed || false,
                    favorite:  favorite || false,
                }]));
            }
            dispatch(todosActions.updateAllTodos({
                editing:       false,
                editedMessage: '',
            }));
        } else {
            dispatch(todosActions.updateAllTodos({
                editing: false,
            }));
            dispatch(todosActions.updateTodo({
                id,
                editing:       true,
                editedMessage: message,
            }));
        }
    };

    const remove = () => {
        dispatch(todosActions.removeTodoAsync(id));
    };

    const toggleCompleted = () => {
        dispatch(todosActions.updateTodoAsync([
            {
                id, message, completed: !completed, favorite,
            }
        ]));
    };

    const toggleFavorite = () => {
        dispatch(todosActions.updateTodoAsync([
            {
                id, message, completed, favorite: !favorite,
            }
        ]));
    };

    return (
        <li className = { styles }>
            <div className = { Styles.content }>
                <Checkbox
                    checked = { completed }
                    className = { Styles.toggleTaskCompletedState }
                    color1 = '#3B8EF3'
                    color2 = '#FFF'
                    inlineBlock
                    onClick = { toggleCompleted }
                />
                <input
                    disabled = { !editing }
                    ref = { ref }
                    type = 'text'
                    value = { editing ? editedMessage : message }
                    onChange = {
                        (e) => {
                            dispatch(todosActions.updateTodo({
                                id,
                                editing:       true,
                                editedMessage: e.target.value,
                            }));
                        }
                    }
                    onKeyDown = {
                        (e) => {
                            if (e.key === 'Enter') {
                                edit();
                            } else if (e.key === 'Escape') {
                                edit(true);
                            }

                        }
                    }
                />
            </div>
            <div className = { Styles.actions }>
                <Star
                    checked = { favorite }
                    inlineBlock
                    className = { Styles.toggleTaskFavoriteState }
                    color1 = '#3B8EF3'
                    color2 = '#000'
                    onClick = { toggleFavorite }
                />
                <Edit
                    inlineBlock
                    checked = { false }
                    className = { Styles.updateTaskMessageOnClick }
                    color1 = '#3B8EF3'
                    color2 = '#000'
                    onClick = { () => edit(true) }
                />
                <Remove
                    inlineBlock
                    className = { Styles.removeTask }
                    color1 = '#3B8EF3'
                    color2 = '#000'
                    onClick = { (e) => remove(e.target.value) }
                />
            </div>
        </li>
    );

};

export default Task;
