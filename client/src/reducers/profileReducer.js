import { UPDATE_PROFILE, GET_PROFILE } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...action.payload,
			};
		case UPDATE_PROFILE:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
