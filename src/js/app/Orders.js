import { Component } from 'react'
import OrderList from './OrderList'
import axios from 'axios'

class Orders extends Component {

	constructor(props) {
		super(props);
		this.state = {
			box: []
		}
	}

	componentDidMount(){
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

	render() {
		return (
			<div className="bm-main-root" >
				<OrderList list={this.state.box} />
			</div>
		)
	}

}

export default Orders