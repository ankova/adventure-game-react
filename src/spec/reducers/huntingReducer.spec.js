import {CAUGHT, MISSED, ADD} from '../../constants';
import expect from 'expect';
import huntingReducer from '../../reducers/huntingReducer';

describe('huntingReducer', () => {

    it('should return initial state', () => {
        const state = huntingReducer({}, {});
        expect(state).toEqual({});
    });

    it('should test CAUGHT', () => {
        const action = {type: CAUGHT, payload:{}};
        expect(huntingReducer({}, action)).toEqual({ caught: {}, missed: false });
    });

    it('should test MISSED', () => {
        const action = {type: MISSED, payload:{}};
        expect(huntingReducer({}, action)).toEqual({ caught: undefined, missed: true });
    });

    it('should test ADD', () => {
        const action = {type: ADD, payload:{}};
        expect(huntingReducer({}, action)).toEqual({ caught: undefined, missed: undefined });
    });
});