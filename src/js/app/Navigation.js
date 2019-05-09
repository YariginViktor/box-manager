import { Component } from 'react'

class Navigation extends Component {

	constructor(props) {
		super(props)

		this.state = {
			store: this.props.store,
			currentView: this.props.currentView
		}
		this.newOrder = this.newOrder.bind(this)
		this.orders = this.orders.bind(this)
		this.navItems  = [
			{name: 'OrderManager', val: <span onClick={this.newOrder}> Новая заявка </span>},
			{name: 'Orders', val: <span onClick={this.orders}> Список заявок </span>}
		]
	}

	changeView(viewName){
		this.state.store.dispatch({
			type: 'CHANGE_VIEW',
			view: viewName
		})
		this.setState({
			currentView: viewName
		})
	}

	newOrder(){
		this.changeView('OrderManager')
	}

	orders(){
		this.changeView('Orders')
	}

	render() {
		return (
			<div className="bm-navigation">
				{this.navItems.map((el) =>{
					if(el.name !== this.state.currentView){return el.val}
				})}
			</div>
		)
	}
}

export default Navigation