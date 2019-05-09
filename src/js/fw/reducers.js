import C from './constants'
import interfaces from '../app/views/interfaces'

export const View = (state={}, action) => {
	switch(action.type) {
		case C.CHANGE_VIEW:
			return {
				view: interfaces[action.view]
			}

		default:
			return state
	}
}