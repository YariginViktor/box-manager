import { Component } from 'react'
import OrderList from './OrderList'
import axios from 'axios'
import settings from '../fw/settings'

class Orders extends Component {

	constructor(props) {
		super(props);
		this.state = {
			box: [],
			store: this.props.store
		}
		this.removeOrder = this.removeOrder.bind(this)
		this.updateOrders = this.updateOrders.bind(this)
		this.editOrder = this.editOrder.bind(this)
	}

	componentDidMount(){
		this.updateOrders()
	}

	updateOrders(){
		axios.get(settings.server.URL + '/orders')
		.then((response) =>
		    this.setState({
		    	box: response.data
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

	render() {
		return (
			<div className="bm-main-order-list" >
				<h1>{ this.state.box.length ? 'Список заказов' : 'Нет заказов' }</h1>
				<OrderList list={this.state.box} removeOrder={this.removeOrder} editOrder={this.editOrder} />
			</div>
		)
	}

}

export default Orders