import expect, { createSpy, spyOn, isSpy } from 'expect';
import React from 'react';
import { connect } from 'react-redux';

import { mount, shallow } from 'enzyme';
import {Main} from '../../components/Main';

describe('Main component', () => {
    let actions, props, wrapper;


    beforeEach(() => {
        actions = {
            caughtCreature: createSpy(),
            missedCreature: createSpy(),
            addCreature: createSpy(),
            releaseCreature: createSpy(),
            startReleasingCreature: createSpy(),
            orderBy: createSpy()
        };

        props = {
            cages: [
                1,
                {creature: {age: 16, captureTime: 1475427375974, mana: 5929, name: "phoenix"}},
                {creature: {age: 388, captureTime: 1475436992276, mana: 5394, name: "medusa"}},
            ],
            hunting: {
                caught: true,
                missed: false
            },
            actions
        };

        wrapper = shallow(<Main {...props} />);
    });

    it ('should render the content', () => {
        expect(wrapper.find('.show-total').length).toEqual(1);
        expect(wrapper.find('.sort').length).toEqual(1);
        expect(wrapper.find('.captured').length).toEqual(1);
        expect(wrapper.find('.cage').length).toEqual(props.cages.length);
        expect(wrapper.find('.creature-name').length).toEqual(2);
        expect(wrapper.find('.creature-name').at(0).text()).toEqual('phoenix');
        expect(wrapper.find('.age').at(0).text()).toEqual('Age: 16');
        expect(wrapper.find('.mana').at(0).text()).toEqual('Mana: 5929');
    });

    it('should sort by selected property', () => {
        const mockEvt = {target:{value: 'mana'}};
        const orderBySelector = wrapper.find('.sort select.form-control');
        orderBySelector.props().onChange(mockEvt);
        expect(actions.orderBy).toHaveBeenCalledWith(mockEvt.target.value);
    });

    it('should check the Release button', () => {
        const releaseButton = wrapper.find('.btn').at(2);
        const index = 2;
        releaseButton.props().onClick(index);
        expect(actions.startReleasingCreature).toHaveBeenCalled();
        expect(actions.startReleasingCreature.calls[0].arguments).toEqual(index);
        expect(actions.releaseCreature.calls.length + actions.startReleasingCreature.calls.length).toEqual(1)
    });
});
