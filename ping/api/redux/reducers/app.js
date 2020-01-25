import {ROOT_CHANGED} from '../actions/appActions/changeRoot';

const initialState = {
    root: null,
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case ROOT_CHANGED:
            return Object.assign({}, {root: action.root});
        default:
            return state;
    }
}
