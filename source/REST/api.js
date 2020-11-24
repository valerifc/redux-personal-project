// Instruments
import { MAIN_URL, TOKEN } from "./config";

export const api = {
    get token () {
        return localStorage.getItem("token");
    },
    todos: {
        fetch (page, size, search) {
            return fetch(`${MAIN_URL}?page=${page}&size=${size}&search=${search}`, {
                method:  "GET",
                headers: {
                    Authorization: TOKEN,
                },
            });
        },
        create (message) {
            return fetch(MAIN_URL, {
                method:  "POST",
                headers: {
                    Authorization:  TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
        },
        update (editedTodo) {
            return fetch(MAIN_URL, {
                method:  "PUT",
                headers: {
                    Authorization:  TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedTodo),
            });
        },
        remove (todoId) {
            return fetch(`${MAIN_URL}/${todoId}`, {
                method:  "DELETE",
                headers: {
                    Authorization: TOKEN,
                },
            });
        },
    },
};
