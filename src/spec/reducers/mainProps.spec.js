import * as types from '../../actions/actonTypes';
import expect from 'expect';
import mainProps from '../../reducers/mainProps';

describe('mainProps', () => {

    it('should return initial state', () => {
        const state = mainProps({}, {});
        expect(state).toEqual({});
    });

    it('should test UPDATE_PROPERTIES', () => {
        const action = {type: types.UPDATE_PROPERTIES, result:{test:'test'}};
        expect(mainProps({}, action)).toEqual({ test: 'test' });
    });

    it('should test ADD_NAME_TO_PROPERTIES', () => {
        const action = {type: types.ADD_NAME_TO_PROPERTIES, name:{name: 'test'}};
        expect(mainProps({}, action)).toEqual({ name: 'test' });
    });
});