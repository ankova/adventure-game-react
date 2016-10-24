import cagesReducer from './cagesReducer';
import huntingReducer from './huntingReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  cages: cagesReducer,
  hunting: huntingReducer
});

export default rootReducer;