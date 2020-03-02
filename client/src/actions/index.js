import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
	FETCH_USER,
	ADD_WORKOUT,
	FETCH_WORKOUTS,
	EDIT_WORKOUT,
	DELETE_WORKOUT,
	UPDATE_PROFILE,
	GET_PROFILE,
} from './types';

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
	dispatch({ type: FETCH_USER, payload: res.data._id });
	dispatch({ type: GET_PROFILE, payload: res.data.profile });

	// fetch user data if logged in
	if (res.data) {
		const res = await axios.get('/api/workouts');
		dispatch({ type: FETCH_WORKOUTS, payload: res.data });
	}
};

// export const editProfile = profile => async dispatch => {
// 	const res = await axios.put('/api/profile', profile);
// 	console.log(res);
// 	dispatch({ type: EDIT_PROFILE, payload: res.data });
// };

// export const getProfile = () => async dispatch => {
// 	const res = await axios.get('/api/current_user');
// 	console.log(res);
// 	dispatch({ type: GET_PROFILE, payload: res.data });
// };

export const addWorkout = workout => async dispatch => {
	try {
		dispatch(showLoading());
		const res = await axios.post('/api/workouts', workout);
		dispatch({ type: ADD_WORKOUT, payload: res.data });
		dispatch(hideLoading());
	} catch (error) {
		console.error('error posting data', error.toString());
	}
};

export const editWorkout = workout => async dispatch => {
	try {
		dispatch(hideLoading());
		const res = await axios.put('/api/workouts', workout);
		// console.log(res.data);
		dispatch({ type: EDIT_WORKOUT, payload: res.data });
		dispatch(hideLoading());
	} catch (error) {
		console.error('error loading data', error.toString());
	}
};

export const deleteWorkout = _id => dispatch => {
	dispatch(hideLoading());
	axios.delete('/api/workouts', { data: { id: _id } }).then(workout =>
		dispatch({ type: DELETE_WORKOUT, payload: workout.data })
	);
	dispatch(hideLoading());
};

// Profile Actions

export const updateProfile = profile => async dispatch => {
	try {
		dispatch(showLoading());
		const res = await axios.put('/api/account/profile', profile);
		dispatch({ type: UPDATE_PROFILE, payload: res.data });
		dispatch(hideLoading());
	} catch (error) {
		console.error('error loading data', error.toString());
	}
};
