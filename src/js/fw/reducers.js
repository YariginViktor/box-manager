import C from './constants'
import interfaces from '../app/views/interfaces'

export const View = (state={}, action) => {
	switch(action.type) {
		case C.CHANGE_VIEW:
			return {
				view: interfaces[action.view],
				currentView: action.view
			}

		case C.EDIT_ORDER:
			return {
				view: interfaces[action.view],
				currentView: action.view,
				edit: true,
				id: action.id
			}

		default:
			return state
	}
}