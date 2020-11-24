// Core
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Instruments
import Styles from "./styles.m.css";
import { todosActions } from "../../bus/todos/actions";

const Pagination = () => {
    const dispatch = useDispatch();

    const page = useSelector((state) => state.page.get("page"));
    const total = useSelector((state) => state.page.get("total"));
    const size = useSelector((state) => state.page.get("size"));
    const search = useSelector((state) => state.page.get("search"));

    const pageLast = Math.ceil(total / size) || 1;

    const goToPage = (page) => {
        dispatch(todosActions.fetchTodosAsync({ page, size, search }));
    };

    return (
        <div className = { Styles.paginationWrapper }>
            <button
                className = { Styles.small }
                disabled = { page === 1 }
                onClick = { () => goToPage(page-1) }>
                              ←
            </button>
            <button
                className = { page > 3 ? Styles.pagination : Styles.hidden }
                onClick = { () => goToPage(1) }>
                {1}
            </button>
            <span
                className = { page > 4 ? Styles.pagination : Styles.hidden }>
                ...
            </span>
            <button
                className = { page > 2 ? Styles.pagination : Styles.hidden }
                onClick = { () => goToPage(page - 2) }>
                {page - 2}
            </button>
            <button
                className = { page > 1 ? Styles.pagination : Styles.hidden }
                onClick = { () => goToPage(page - 1) }>
                {page - 1}
            </button>
            <span
                className = { Styles.pagination }>
                {page}
            </span>
            <button
                className = { pageLast - page > 0 ? Styles.pagination : Styles.hidden }
                onClick = { () => goToPage(page + 1) }>
                {page + 1}
            </button>
            <button
                className = { pageLast - page > 1 ? Styles.pagination : Styles.hidden }
                onClick = { () => goToPage(page + 2) }>
                {page + 2}
            </button>
            <span
                className = { pageLast - page > 3 ? Styles.pagination : Styles.hidden }>
                ...
            </span>
            <button
                className = { pageLast - page > 2 ? Styles.pagination : Styles.hidden }
                onClick = { () => goToPage(pageLast) }>
                {pageLast}
            </button>
            <button
                className = { Styles.small }
                disabled = { page === pageLast }
                onClick = { () => goToPage(page+1) }>
                          →
            </button>
        </div>
    );
};

export default Pagination;
