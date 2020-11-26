/* Setup files module.
**
** This module will be executed before each test.
**
** This module contains a code to configure or set up the
** testing environment before each test. Since every test
** runs in its own environment, these scripts will be
** executed in the testing environment immediately before
** executing the test code itself.
**
** This module excutes before setupFramework module.
**
*/

import { LocalStorage } from './mocks/localStorage';

const page = {
    total:        17,
    page:         2,
    size:         10,
    search:       'test_search',
    allCompleted: true,
    newTodoText:  'TEST_TEXT',
};

const todos = [
    {
        "id":        "5a7f136231a5d90001271637",
        "message":   "Hello Andrey!",
        "completed": true,
        "favorite":  false,
        "created":   "2018-02-10T15:44:34.624Z",
        "modified":  "2018-02-10T16:01:12.406Z",
    },
    {
        "id":        "5a7f136131a5d90001271636",
        "message":   "Hello",
        "completed": false,
        "favorite":  false,
        "created":   "2018-02-10T15:44:33.675Z",
    },
    {
        "id":        "5a7f136031a5d90001271635",
        "message":   "Hello",
        "completed": false,
        "favorite":  false,
        "created":   "2018-02-10T15:44:32.959Z",
    }
];

const todo = {
    "id":        "5a7f136031a5d90001271635",
    "message":   "Hello",
    "completed": false,
    "favorite":  false,
    "created":   "2018-02-10T15:44:32.959Z",
};

const todoWithPage = {
    todo: {
        "id":        "5a7f136031a5d90001271635",
        "message":   "Hello",
        "completed": false,
        "favorite":  false,
        "created":   "2018-02-10T15:44:32.959Z",
    },
    "size":   10,
    "search": "abc",
};

const todoId = "5a7f136231a5d90001271637";

const queryParams = {
    page:   2,
    size:   10,
    search: 'test_search',
};

const message = "TEST_MESSAGE";

const errorMessage = "some error message";

const error = new Error(errorMessage);

const responseDataSuccessCreate = {
    data:    todos,
    message: "the request has succeeded",
    meta:    {
        total: 9,
        page:  1,
        size:  3,
    },
};
const responseSuccessCreate = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccessCreate)),
};

const responseDataFail = {
    message: errorMessage,
};

const responseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

global.localStorage = new LocalStorage();

global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;

global.__ = {
    page,
    todos,
    todo,
    todoWithPage,
    todoId,
    queryParams,
    message,
    error,
    errorMessage,
    responseDataFail,
    responseSuccessCreate,
    responseDataSuccessCreate,
    responseFail400,
    fetchResponseFail400,
};
