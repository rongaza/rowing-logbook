import { ADD_WORKOUT, FETCH_WORKOUTS, EDIT_WORKOUT, DELETE_WORKOUT } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case ADD_WORKOUT:
			return state.concat(action.payload);

		case FETCH_WORKOUTS:
			return [...action.payload];
		case EDIT_WORKOUT:
			// console.log(typeof action.payload.distance);

			return state.map(workout => {
				// console.log(typeof(workout.distance));
				if (workout._id === action.payload._id) {
					return {
						...workout,
						...action.payload,
					};
				} else {
					return workout;
				}
			});
		// return state;

		case DELETE_WORKOUT:
			console.log(action.payload);
			return state.filter(workout => {
				return workout._id !== action.payload._id;
			});

		default:
			return state;
	}
}
