// Core
import { apply, put } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";

// Instruments
import { api } from "../../../REST";
import { pageActions } from "../../page/actions";
import { todosActions } from "../actions";
import { uiActions } from "../../ui/actions";
import { createTodo } from "../saga/workers";

const createTodoAction = todosActions.createTodoAsync(__.message);
const saga = cloneableGenerator(createTodo)(createTodoAction);

let clone1 = null;

let clone2 = null;

describe("createTodo saga:", () => {
    describe("should pass until response received:", () => {
        test("should dispatch «startFetching» action", () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });

        test("should call a fetch request", () => {
            expect(saga.next().value).toEqual(
                apply(api, api.todos.create, [__.message])
            );
            clone1 = saga.clone();
            clone2 = saga.clone();
        });
    });

    describe("should handle a 400 status response:", () => {
        test("a fetch request should return 400 status response", () => {
            expect(clone1.next(__.fetchResponseFail400).value).toEqual(
                apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            );
        });

        test("should contain a response data object", () => {
            expect(clone1.next(__.responseDataFail).value).toEqual(
                put(uiActions.emitError(__.error, "createTodo worker"))
            );
        });

        test("should dispatch «stopFetching» action", () => {
            expect(clone1.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(clone1.next().done).toBe(true);
        });
    });

    describe("should handle a 200 status response and page number 1:", () => {
        test("a fetch request should return a 200 status response data object", () => {
            expect(saga.next(__.responseSuccessCreate).value).toEqual(
                apply(__.responseSuccessCreate, __.responseSuccessCreate.json)
            );
        });

        test("should dispatch «createTodo» action", () => {
            expect(saga.next(__.responseDataSuccessCreate).value).toEqual(
                put(
                    todosActions.createTodo({
                        todo:   __.responseDataSuccessCreate.data,
                        size:   __.responseDataSuccessCreate.meta.size,
                        search: __.responseDataSuccessCreate.meta.search,
                    })
                )
            );
        });

        test("should handle selectors", () => {
            expect(saga.next().value).toEqual(1);
            expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "type": "STOP_FETCHING",
    },
    "channel": null,
  },
}
`);
            expect(saga.next().value).toMatchInlineSnapshot(`undefined`);
            expect(saga.next().value).toMatchInlineSnapshot(`undefined`);
        });

        test("should dispatch «setPage» action", () => {
            expect(saga.next(__.responseDataSuccessCreate).value).toEqual(
                pageActions.setPage({
                    total: __.responseDataSuccessCreate.meta.total + 1,
                })
            );
        });

        test("should dispatch «stopFetching» action", () => {
            expect(saga.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(saga.next().done).toBe(true);
        });
    });
});
