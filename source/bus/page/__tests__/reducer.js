// Types
import { pageReducer } from "../reducer";

// Actions
import { pageActions } from "../actions";

describe("page reducer:", () => {
  test("should return initial state by default", () => {
    expect(pageReducer(void 0, {})).toMatchInlineSnapshot(`
Immutable.Map {
  "total": 0,
  "page": 1,
  "size": 5,
  "search": "",
  "allCompleted": false,
  "newTodoText": "",
}
`);
  });

  test("should handle SET_PAGE action", () => {
    expect(pageReducer(void 0, pageActions.setPage(__.page)))
      .toMatchInlineSnapshot(`
Immutable.Map {
  "total": 17,
  "page": 2,
  "size": 10,
  "search": "test_search",
  "allCompleted": true,
  "newTodoText": "TEST_TEXT",
}
`);
  });
});
