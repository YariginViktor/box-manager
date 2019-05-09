import { Component } from 'react'
import { createStore } from 'redux'
import { View } from '../fw/reducers'
import Navigation from './Navigation'

const store = createStore(View)

console.log(store.getState())

class MainScreen extends Component {

	constructor(props) {
		super(props);
		store.dispatch({
			type: 'CHANGE_VIEW',
			view: 'Orders'
		})
		this.state = {
			view: store.getState().view
		}
		this.createOrder = this.createOrder.bind(this)
	}

	componentWillMount() {

		store.subscribe(() =>
			this.setState({
		    	view: store.getState().view
		    })
		)
	}

	createOrder() {
		console.log('New order')
		store.dispatch({
			type: 'CHANGE_VIEW',
			view: 'CreateOrder'
		})
	}

	render() {
		return (
			<div className="bm-main-root" >
				<this.state.view />
				<Navigation newOrder={this.createOrder} />
			</div>
		)
	}

}

export default MainScreen