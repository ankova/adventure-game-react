import * as types from '../actions/actonTypes';

export default function mainProps(state={}, action) {
    switch (action.type) {

        case types.UPDATE_PROPERTIES:
            return Object.assign({}, state.creature, action.result);

        case types.ADD_NAME_TO_PROPERTIES:
            return Object.assign({}, state.creature, action.name);

        default:
            return state;
    }
}