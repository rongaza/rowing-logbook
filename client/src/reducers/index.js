import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workoutReducer from './workoutReducer';

export default combineReducers({
	//authentication
	auth: authReducer,
	workouts: workoutReducer,
});
