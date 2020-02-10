import axios from 'axios';
import { FETCH_USER, ADD_WORKOUT, FETCH_WORKOUTS, EDIT_WORKOUT, DELETE_WORKOUT } from './types';

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
	dispatch({ type: FETCH_USER, payload: res.data });

	// fetch user data if logged in
	if (res.data) {
		const res = await axios.get('/api/workouts');
		dispatch({ type: FETCH_WORKOUTS, payload: res.data });
	}
};

export const addWorkout = workout => async dispatch => {
	const res = await axios.post('/api/workouts', workout);
	dispatch({ type: ADD_WORKOUT, payload: res.data });
};

export const editWorkout = workout => async dispatch => {
	const res = await axios.put('/api/workouts', workout);

	dispatch({ type: EDIT_WORKOUT, payload: workout });
};

export const deleteWorkout = _id => dispatch => {
	console.log('action: delete ', _id);
	axios.delete('/api/workouts', { data: { id: _id } }).then(workout =>
		dispatch({ type: DELETE_WORKOUT, payload: workout.data })
	);
};
