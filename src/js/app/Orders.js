import { Component } from 'react'
import OrderList from './OrderList'
import axios from 'axios'

class Orders extends Component {

	constructor(props) {
		super(props);
		this.state = {
			box: []
		}
		this.removeOrder = this.removeOrder.bind(this)
		this.updateOrders = this.updateOrders.bind(this)
	}

	componentDidMount(){
		this.updateOrders()
	}

	updateOrders(){
		axios.get('http://127.0.0.1:8090/orders')
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
		axios.delete('http://127.0.0.1:8090/orders/_id', { params: { id: e.target.id } })
		.then(response =>
			this.updateOrders()
		)
		.catch(error =>
			console.log(error)
		)
	}

	render() {
		return (
			<div className="bm-main-order-list" >
				<h1>Список заказов</h1>
				<OrderList list={this.state.box} removeOrder={this.removeOrder} />
			</div>
		)
	}

}

export default Orders