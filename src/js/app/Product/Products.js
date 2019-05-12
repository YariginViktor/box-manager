import { Component } from 'react'
import ProductsList from './ProductsList'
import axios from 'axios'
import settings from '../../fw/settings'

class Products extends Component {

	constructor(props){
		super(props)

		this.state = {
			products: [],
			store: this.props.store
		}

		this.updateProducts = this.updateProducts.bind(this)
		this.removeProduct = this.removeProduct.bind(this)
		this.editProduct = this.editProduct.bind(this)


	}

	componentDidMount(){
		this.updateProducts()
	}

	updateProducts(){
		axios.get(settings.server.URL + '/products')
		.then((response) =>
		    this.setState({
		    	products: response.data
		    })
		)
		.catch((error) =>
		    console.log(error)
		)
	}

	removeProduct(e){
		axios.delete(settings.server.URL + '/products/_id', { params: { id: e.target.id } })
		.then(response =>
			this.updateOrders()
		)
		.catch(error =>
			console.log(error)
		)
	}

	editProduct(e){
		this.state.store.dispatch({
			type: 'EDIT_PRODUCT',
			view: 'ProductManager',
			id: e.target.id
		})
	}

	render(){
		return(
			<div className="bm-list-root">
				<h1>{ this.state.products.length ? 'Список продуктов' : 'Нет продуктов' }</h1>
				<ProductsList list={this.state.products} removeProduct={this.removeProduct} editProduct={this.editProduct} />
			</div>
		)
	}

}

export default Products