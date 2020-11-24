// Types
import { types } from "./types";

export const pageActions = {
    setPage: (meta) => {
        return {
            type:    types.SET_PAGE,
            payload: meta,
        };
    },
};
