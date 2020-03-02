import { ADD_WORKOUT, FETCH_WORKOUTS, EDIT_WORKOUT, DELETE_WORKOUT } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case ADD_WORKOUT:
			return state.concat(action.payload);

		case FETCH_WORKOUTS:
			return [...action.payload];

		case EDIT_WORKOUT:
			return state.map(workout => {
				if (workout._id === action.payload._id) {
					return {
						...workout,
						...action.payload,
					};
				} else {
					return workout;
				}
			});

		case DELETE_WORKOUT:
			return state.filter(workout => {
				return workout._id !== action.payload._id;
			});

		default:
			return state;
	}
}
