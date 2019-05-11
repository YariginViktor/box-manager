import { Component } from 'react'
import { createStore } from 'redux'
import { View } from '../fw/reducers'
import Navigation from './Navigation'
import '../../styles/main.css'

const store = createStore(View)

class MainScreen extends Component {

	constructor(props) {
		super(props);
		store.dispatch({
			type: 'CHANGE_VIEW',
			view: 'Orders'
		})
		this.state = store.getState()
	}

	componentWillMount() {
		store.subscribe(() => 
			this.setState(store.getState())
		)
	}

	render() {
		return (
			<div className="bm-main-root" >
				<this.state.view store={store} />
				<Navigation store={store} currentView={this.state.currentView} />
			</div>
		)
	}

}

export default MainScreen