import { combineReducers } from 'redux';
import meetingReducer from './meetingReducers/meetingReducer'

export default combineReducers({
    data:meetingReducer
});