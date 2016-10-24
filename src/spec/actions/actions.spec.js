import {START_RELEASE } from '../../constants';
import {startReleasingCreature} from '../../actions';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

describe('actions', () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    const store = mockStore();
    const expectedAction = [{type: START_RELEASE, payload: 1}];

    it('test startReleasingCreature', () => {
        store.dispatch(startReleasingCreature(1));
        expect(store.getActions()).toEqual(expectedAction);
    });
});