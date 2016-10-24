import {CAUGHT, MISSED, ADD} from '../constants'


const initialState = {
};
const huntinReducer = (hunting = initialState, action) => {
    const {payload} = action;
    switch(action.type) {
        case CAUGHT:
            return {
                caught: action.payload,
                missed: false
            }

        case MISSED:
            return {
                caught: undefined,
                missed: true
            }
        case ADD:
            return {
                caught: undefined,
                missed: undefined
            }
        default:
            return hunting;
    }
};

export default huntinReducer;