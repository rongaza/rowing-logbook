import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
	//authentication
	auth: authReducer,
	name: () => 'ron',
});
