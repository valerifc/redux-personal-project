// Actions
import { pageActions } from "../actions";

describe('page actions:', () => {
    test('startFetching', () => {
        expect(pageActions.setPage(__.page)).toMatchSnapshot();
    });
});
