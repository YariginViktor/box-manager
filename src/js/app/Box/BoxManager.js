import { Component } from 'react'
import axios from 'axios'
import settings from '../../fw/settings'
import CompositionList from '../CompositionList'
import CompositionSelect from '../CompositionSelect'

class BoxManager extends Component {

	constructor(props){
		super(props)
		this.state = {
			process: true,
			error: false,
			edit: this.props.store.getState().edit || false,
			id: this.props.store.getState().id || false,
			store: this.props.store,
			box: {
				products: [],
				amount: 0
			},
			products: [],
			showProductSelect: false
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.getBox = this.getBox.bind(this)
		this.getProducts = this.getProducts.bind(this)
		this.showProductSelect = this.showProductSelect.bind(this)
		this.hideProductSelect = this.hideProductSelect.bind(this)
		this.addItem = this.addItem.bind(this)
		this.updateAmount = this.updateAmount.bind(this)
		this.upItemCount = this.upItemCount.bind(this)
		this.downItemCount = this.downItemCount.bind(this)
	}

	componentDidMount(){
		if(this.state.edit) {
			this.getBox()
		}
		this.getProducts()
	}

	onSubmit(e){
		e.preventDefault()
		if (!this.state.edit) {
			axios.post(settings.server.URL + '/boxes', {
				id: this.state.id,
				ico: 'https://techcrunch.com/wp-content/uploads/2018/01/gettyimages-890897004.jpg?w=730&crop=1',
				title: e.target[0].value,
				descr: e.target[1].value,
				price: e.target[2].value,
				created: new Date().toString(),
				products: this.state.box.products
			})
			.then(response =>
				this.setState({
					process: false,
					error: false
				})
			)
			.catch(error =>
				this.setState({
					process: false,
					error: true
				})
			)
		} else {
			axios.put(settings.server.URL + '/boxes/save', { 
				id: this.state.id,
				ico: 'https://techcrunch.com/wp-content/uploads/2018/01/gettyimages-890897004.jpg?w=730&crop=1',
				title: e.target[0].value,
				descr: e.target[1].value,
				price: e.target[2].value,
				created: new Date().toString(),
				products: this.state.box.products

			})
			.then(response =>
				this.setState({
					process: false,
					error: false
				})
			)
			.catch(error =>
				this.setState({
					process: false,
					error: true
				})
			)
		}

		setTimeout(() => {
			this.setState({
				process: true,
				error: false
			})
		}, 5000)
	}

	getProducts(){
		axios.get(settings.server.URL + '/products')
		.then((response) =>{
		    this.setState({
		    	products: response.data
		    })
		    this.updateAmount()
		})
		.catch((error) =>
		    console.log(error)
		)
	}

	getBox(){
		axios.get(settings.server.URL + '/boxes/find', { params: { id: this.state.id } })
		.then((response) =>
		    this.setState({
				box: response.data[0]
			})
		)
		.catch((error) =>
		    console.log(error)
		)
	}

	showProductSelect(){
		this.setState({
			showProductSelect: true
		})
	}

	hideProductSelect(){
		this.setState({
			showProductSelect: false
		})
	}

	updateAmount(){
		let sum = 0
		this.state.box.products.forEach(item => {
			sum += parseInt(item.data.price) * item.value
		})
		this.state.box.amount = sum
		this.setState({})
	}

	upItemCount(e){
		this.updateItemCount(e, 'up')
	}

	downItemCount(e){
		this.updateItemCount(e, 'down')
	}

	updateItemCount(obj, direction){
		let prodId = obj.target.closest('.bm-form-composition-list-item').id
		let curCount = parseInt(obj.target.closest('.bm-form-composition-list-item').getElementsByClassName('bm-form-composition-list-count')[0].innerHTML)
		let newCount = direction === 'up' ? ++curCount : (curCount === 0 ? 0 : --curCount)
		this.state.box.products.forEach(item =>{
			if (item.data._id === prodId) {item.value = newCount}
		})
		this.updateAmount()
	}

	addItem(e){
		axios.get(settings.server.URL + '/products/find', { params: { id: e.currentTarget.id } })
		.then((response) =>{
			let prod = {
				data: response.data[0],
				value: 1
			}
			this.state.box.products.push(prod)
		    this.setState({
				showProductSelect: false
			})
			this.updateAmount()
		})
		.catch((error) =>
		    console.log(error)
		)
	}

	render(){
		return(
			<form onSubmit={this.onSubmit} className="bm-form">
				<h1>{ this.state.edit ? 'Редактирование набора' : 'Новый набор'}</h1>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Название набора</div>
					<div className="bm-form-item-data">
						<input type="text" name="title" placeholder="" defaultValue={this.state.edit ? this.state.box.title : '' }/>
					</div>
				</div>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Описание набора</div>
					<div className="bm-form-item-data">
						<input type="text" name="descr" placeholder="" defaultValue={this.state.edit ? this.state.box.descr : '' }/>
					</div>
				</div>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Цена</div>
					<div className="bm-form-item-data">
						<input type="text" name="price" placeholder="" defaultValue={this.state.edit ? this.state.box.price : '' }/>
					</div>
				</div>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Состав</div>
					<div className="bm-form-item-data">
						<div className="bm-form-composition-list">
							<div className="bm-form-composition-list-amount">Итог: {this.state.box.amount} p.</div>
							<CompositionList items={this.state.box.products} upItemCount={this.upItemCount} downItemCount={this.downItemCount} />
							<div>
								<div className="bm-btn" onClick={this.showProductSelect}>Добавить</div>
							</div>
						</div>
					</div>
				</div>
				<button>
					{this.state.edit ? 'Сохранить' : 'Создать набор'}
				</button>
				<div className="bm-form-select-composition-popup" style={{display: this.state.showProductSelect ? 'block' : 'none'}}>
					<div className="bm-form-select-composition-popup-wrapper">
						<CompositionSelect items={this.state.products} addItem={this.addItem} />
					</div>
					<div className="bm-btn" onClick={this.hideProductSelect}>Отмена</div>
				</div>
				<div className="bm-form-status">
					{ this.state.process ? '' : (this.state.error ? 'При обработке запроса возникла ошибка' : 'Набор успешно сохранен')}
				</div>
			</form>
		)
	}
}

export default BoxManager