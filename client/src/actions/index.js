import axios from 'axios';
import { FETCH_USER } from './types';

// export const fetchUser = () => {
// 	// if reduxThunk sees that a function is returned
// 	// isntead of an action.. reduxThunk will call this
// 	// function and pass in dispatch function(dispatch)
// 	return async function(dispatch) {
// 		const currentUser = await axios.get('/api/current_user');
// 		//.then(res => dispatch({ type: FETCH_USER, payload: res }));
// 		dispatch({ type: FETCH_USER, payload: currentUser });
// 	};
// };

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	//.then(res => dispatch({ type: FETCH_USER, payload: res }));
	dispatch({ type: FETCH_USER, payload: res.data });
};
