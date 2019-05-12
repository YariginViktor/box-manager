import { Component } from 'react'
import axios from 'axios'
import settings from '../../fw/settings'

class ProductManager extends Component {

	constructor(props){
		super(props)
		this.state = {
			wait: true,
			error: false,
			edit: this.props.store.getState().edit || false,
			id: this.props.store.getState().id || false,
			store: this.props.store,
			product: false
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.getProduct = this.getProduct.bind(this)
	}

	componentDidMount(){
		if(this.state.edit) {
			this.getProduct()
		}
	}

	onSubmit(e){
		e.preventDefault()
		if (!this.state.edit) {
			axios.post(settings.server.URL + '/products', {
				id: this.state.id,
				ico: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkHz7-zp2rQaDtjpN2B2ZHktD7HBMSN3NB-3yKbUs1OMdiTtPN',
				title: e.target[0].value,
				descr: e.target[1].value,
				price: e.target[2].value,
				created: new Date().toString()
			})
			.then(response =>
				this.setState({
					wait: false,
					error: false
				})
			)
			.catch(error =>
				this.setState({
					wait: false,
					error: true
				})
			)
		} else {
			axios.put(settings.server.URL + '/products/save', { 
				id: this.state.id,
				ico: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkHz7-zp2rQaDtjpN2B2ZHktD7HBMSN3NB-3yKbUs1OMdiTtPN',
				title: e.target[0].value,
				descr: e.target[1].value,
				price: e.target[2].value,
				created: new Date().toString()

			})
			.then(response =>
				this.setState({
					wait: false,
					error: false
				})
			)
			.catch(error =>
				this.setState({
					wait: false,
					error: true
				})
			)
		}

		setTimeout(() => {
			this.setState({
				wait: true,
				error: false
			})
		}, 5000)
	}

	getProduct(){
		axios.get(settings.server.URL + '/products/find', { params: { id: this.state.id } })
		.then((response) =>
		    this.setState({
				product: response.data[0]
			})
		)
		.catch((error) =>
		    console.log(error)
		)
	}

	render(){
		return(
			<form onSubmit={this.onSubmit} className="bm-form">
				<h1>{ this.state.edit ? 'Редактирование продукта' : 'Новый продукт'}</h1>
				<div><span>Название продукта</span><input type="text" name="title" placeholder="" defaultValue={this.state.edit ? this.state.product.title : '' }/></div>
				<div><span>Описание продукта</span><input type="text" name="descr" placeholder="" defaultValue={this.state.edit ? this.state.product.descr : '' }/></div>
				<div><span>Цена</span><input type="text" name="price" placeholder="" defaultValue={this.state.edit ? this.state.product.price : '' }/></div>
				<button>
					{this.state.edit ? 'Сохранить' : 'Создать продукт'}
				</button>
				<div className="bm-form-status">
					{ this.state.wait ? '' : (this.state.error ? 'При обработке запроса возникла ошибка' : 'Продукт успешно сохранен')}
				</div>
			</form>
		)
	}
}

export default ProductManager