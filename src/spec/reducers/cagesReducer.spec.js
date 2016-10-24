import expect from 'expect';
import cagesReducer from '../../reducers/cagesReducer';
import {ADD, RELEASE, START_RELEASE, ORDER_BY} from '../../constants';

describe('cagesReducer', () => {

    const initialState = [1, 2, 3, 4, 5];

    it('should return initial state', () => {
        const state = cagesReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    it('should test ADD', () => {
        const initialState = [1, 2, 3, 4, 5];
        const payload = {
            creature: {name: 'test', age: 35},
            cageInd: 3
        };
        const action = {type: ADD, payload};
        expect(cagesReducer(initialState, action)).toEqual([ 1, 2, 3, { creature: { name: 'test', age: 35 } }, 5 ]);
    });

    it('should test RELEASE', () => {
        const action = {type: RELEASE, payload: 3};
        expect(cagesReducer(initialState, action)).toEqual([ 1, 2, 3, {}, 5 ]);
    });

    it('should test START_RELEASE', () => {
        const action = {type: START_RELEASE, payload: 3};
        expect(cagesReducer(initialState, action)).toEqual([ 1, 2, 3, { releasing: true }, 5 ]);
    });

    it('should test ORDER_BY name', () => {
        const initialState = [{creature: {name: 'beta'}}, 2, {creature: {name: 'alpha'}}, 4, 5];
        const action = {type: ORDER_BY, payload: 'name'};
        expect(cagesReducer(initialState, action)).toEqual([ { creature: { name: 'alpha' } }, { creature: { name: 'beta' } }, 2, 4, 5 ]);
    });

    it('should test ORDER_BY age', () => {
        const initialState = [{creature: {age: 5}}, 2, {creature: {age: 3}}, 4, 5];
        const action = {type: ORDER_BY, payload: 'age'};
        expect(cagesReducer(initialState, action)).toEqual([ { creature: { age: 3 } }, { creature: { age: 5 } }, 2, 4, 5 ]);
    });

    it('should test ORDER_BY mana', () => {
        const initialState = [{creature: {mana: 1355}}, 2, {creature: {mana: 135}}, 4, 5];
        const action = {type: ORDER_BY, payload: 'mana'};
        expect(cagesReducer(initialState, action)).toEqual([ { creature: { mana: 135 } }, { creature: { mana: 1355 } }, 2, 4, 5 ]);
    });

    it('should test ORDER_BY captureTime', () => {
        const initialState = [{creature: {captureTime: 1355}}, 2, {creature: {captureTime: 135}}, 4, 5];
        const action = {type: ORDER_BY, payload: 'captureTime'};
        expect(cagesReducer(initialState, action)).toEqual([ { creature: { captureTime: 135 } }, { creature: { captureTime: 1355 } }, 2, 4, 5 ]);
    });
});