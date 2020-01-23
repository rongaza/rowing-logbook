import { ADD_WORKOUT, FETCH_WORKOUTS } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case ADD_WORKOUT:
			return state.concat(action.payload);

		case FETCH_WORKOUTS:
			return [...action.payload];
		default:
			return state;
	}
}
