import { Component } from 'react'
import OrderList from './OrderList'
import AddItem from '../AddItem'
import axios from 'axios'
import settings from '../../fw/settings'

class Orders extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			store: this.props.store
		}
		this.removeOrder = this.removeOrder.bind(this)
		this.updateOrders = this.updateOrders.bind(this)
		this.editOrder = this.editOrder.bind(this)
		this.openOrderManager = this.openOrderManager.bind(this)
	}

	componentDidMount(){
		this.updateOrders()
	}

	updateOrders(){
		axios.get(settings.server.URL + '/orders')
		.then((response) =>
		    this.setState({
		    	orders: response.data
		    })
		)
		.catch((error) =>
		    console.log(error)
		)
	}

	removeOrder(e){
		axios.delete(settings.server.URL + '/orders/_id', { params: { id: e.target.id } })
		.then(response =>
			this.updateOrders()
		)
		.catch(error =>
			console.log(error)
		)
	}

	editOrder(e){
		this.state.store.dispatch({
			type: 'EDIT_ORDER',
			view: 'OrderManager',
			id: e.target.id
		})
	}

	openOrderManager(){
		this.state.store.dispatch({
			type: 'CHANGE_VIEW',
			view: 'OrderManager'
		})
	}

	render() {
		return (
			<div className="bm-list-root" >
				<h1>{ this.state.orders.length ? 'Список заказов' : 'Нет заказов' }</h1>
				<OrderList list={this.state.orders} removeOrder={this.removeOrder} editOrder={this.editOrder} />
				<AddItem openForm={this.openOrderManager}/>
			</div>
		)
	}

}

export default Orders