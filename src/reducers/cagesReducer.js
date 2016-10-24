import {ADD, RELEASE, START_RELEASE, ORDER_BY} from '../constants'

const initialState = Array.apply(null, Array(10)).map((_, i) => i)

const cagesReducer = (cages = initialState, action) => {
    const {payload} = action;

    switch(action.type){

        case RELEASE:
            return [...cages.slice(0, action.payload), {}, ...cages.slice(action.payload + 1)];

        case START_RELEASE:
            return [...cages.slice(0, action.payload), {...cages[action.payload], releasing: true}, ...cages.slice(action.payload + 1)];

        case ORDER_BY:
            return [...cages.filter(c => c.creature).sort((a, b) => a.creature[action.payload] > b.creature[action.payload] ? 1 : -1), ...cages.filter(c => !c.creature)];

        case ADD:
            return cages.map((c, i) => (
                    i != payload.cageInd
                        ? c
                        : {...cages[payload.cageInd], creature: payload.creature}
                ))

        default:
            return cages;
    }
}

export default cagesReducer;