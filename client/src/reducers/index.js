import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workoutReducer from './workoutReducer';
import profileReducer from './profileReducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
	//authentication
	auth: authReducer,
	workouts: workoutReducer,
	profile: profileReducer,
	loadingBar: loadingBarReducer,
});
