import {CAUGHT, MISSED, ADD, RELEASE, START_RELEASE, ORDER_BY} from '../constants';


export const caughtCreature = (creature) => ({type: CAUGHT, payload: creature});
export const missedCreature = () => ({type: MISSED});
export const addCreature = (cageInd, creature) => ({type: ADD, payload: {cageInd, creature}});
export const orderBy = (propName) => ({type: ORDER_BY, payload: propName});
export const releaseCreature = (cageInd) => ({type: RELEASE, payload: cageInd});
export const startReleasingCreature = (cageInd) => {
    return (dispatch) => {
        dispatch({type: START_RELEASE, payload: cageInd});
        return setTimeout(() => {
            dispatch(releaseCreature(cageInd));
        }, 15000);
    }
};
