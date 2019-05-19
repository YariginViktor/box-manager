import { Component } from 'react'
import axios from 'axios'
import settings from '../../fw/settings'
import CompositionList from '../CompositionList'
import CompositionSelect from '../CompositionSelect'

class OrderManager extends Component {

	constructor(props){
		super(props)
		this.state = {
			wait: true,
			error: false,
			edit: this.props.store.getState().edit || false,
			id: this.props.store.getState().id || false,
			store: this.props.store,
			order: {
				boxes: [],
				amount: 0
			},
			boxes: [],
			showBoxSelect: false
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.getOrder = this.getOrder.bind(this)
		this.formateDate = this.formateDate.bind(this)
		this.getBoxes = this.getBoxes.bind(this)
		this.showBoxSelect = this.showBoxSelect.bind(this)
		this.hideBoxSelect = this.hideBoxSelect.bind(this)
		this.addItem = this.addItem.bind(this)
		this.updateAmount = this.updateAmount.bind(this)
		this.upItemCount = this.upItemCount.bind(this)
		this.downItemCount = this.downItemCount.bind(this)
	}

	componentDidMount(){
		if(this.state.edit) {
			this.getOrder()
		}
		this.getBoxes()
	}

	onSubmit(e){
		e.preventDefault()
		if (!this.state.edit) {
			axios.post(settings.server.URL + '/orders', {
				title: e.target[0].value,
				user: e.target[1].value,
				phone: e.target[2].value,
				descr: e.target[3].value,
				date: e.target[4].value,
				boxes: this.state.order.boxes,
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
			axios.put(settings.server.URL + '/orders/save', { 
				id: this.state.id,
				title: e.target[0].value,
				user: e.target[1].value,
				phone: e.target[2].value,
				descr: e.target[3].value,
				date: e.target[4].value,
				boxes: this.state.order.boxes,
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

	getBoxes(){
		axios.get(settings.server.URL + '/boxes')
		.then((response) =>{
		    this.setState({
		    	boxes: response.data
		    })
		    this.updateAmount()
		})
		.catch((error) =>
		    console.log(error)
		)
	}

	getOrder(){
		axios.get(settings.server.URL + '/orders/find', { params: { id: this.state.id } })
		.then((response) =>{
		    response.data[0].date = this.formateDate(response.data[0].date)
		    this.setState({
				order: response.data[0]
			})
		})
		.catch((error) =>
		    console.log(error)
		)
	}

	formateDate(date){
		const lead0 = (num) => {
			return num < 10 ? '0' + num : num
		}
		const d = new Date(date)
		return d.getFullYear() + '-' + lead0( d.getMonth() + 1 ) + '-' + lead0(d.getDate()) 
	}

	showBoxSelect(){
		this.setState({
			showBoxSelect: true
		})
	}

	hideBoxSelect(){
		this.setState({
			showBoxSelect: false
		})
	}

	updateAmount(){
		let sum = 0
		this.state.order.boxes.forEach(item => {
			sum += parseInt(item.data.price) * item.value
		})
		this.state.order.amount = sum
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
		this.state.order.boxes.forEach(item =>{
			if (item.data._id === prodId) {item.value = newCount}
		})
		this.updateAmount()
	}

	addItem(e){
		axios.get(settings.server.URL + '/boxes/find', { params: { id: e.currentTarget.id } })
		.then((response) =>{
			let prod = {
				data: response.data[0],
				value: 1
			}
			this.state.order.boxes.push(prod)
		    this.setState({
				showBoxSelect: false
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
				<h1>{ this.state.edit ? 'Редактирование заказа' : 'Новый заказ'}</h1>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Название заказа</div>
					<div className="bm-form-item-data">
						<input type="text" name="title" placeholder="" defaultValue={this.state.edit ? this.state.order.title : '' }/>
					</div>
				</div>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Имя заказчика</div>
					<div className="bm-form-item-data">
						<input type="text" name="User" placeholder="" defaultValue={this.state.edit ? this.state.order.user : '' }/>
					</div>
				</div>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Телефон заказчика</div>
					<div className="bm-form-item-data">
						<input type="text" name="phone" placeholder="8 (999) 999 99 99" defaultValue={this.state.edit ? this.state.order.phone : '' }/>
					</div>
				</div>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Комментарий к заказу</div>
					<div className="bm-form-item-data">
						<input type="text" name="User" placeholder="" defaultValue={this.state.edit ? this.state.order.descr : '' }/>
					</div>
				</div>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Когда нужно</div>
					<div className="bm-form-item-data">
						<input type="date" name="date" placeholder="" defaultValue={this.state.edit ? this.state.order.date : '' }/>
					</div>
				</div>
				<div className="bm-form-item">
					<div className="bm-form-item-title">Состав</div>
					<div className="bm-form-item-data">
						<div className="bm-form-composition-list">
							<div className="bm-form-composition-list-amount">Итог: {this.state.order.amount} p.</div>
							<CompositionList items={this.state.order.boxes} upItemCount={this.upItemCount} downItemCount={this.downItemCount} />
							<div>
								<div className="bm-btn" onClick={this.showBoxSelect}>Добавить</div>
							</div>
						</div>
					</div>
				</div>
				<button>
					{this.state.edit ? 'Сохранить' : 'Создать заказ'}
				</button>
				<div className="bm-form-select-composition-popup" style={{display: this.state.showBoxSelect ? 'block' : 'none'}}>
					<div className="bm-form-select-composition-popup-wrapper">
						<CompositionSelect items={this.state.boxes} addItem={this.addItem} />
					</div>
					<div className="bm-btn" onClick={this.hideProductSelect}>Отмена</div>
				</div>
				<div className="bm-form-status">
					{ this.state.wait ? '' : (this.state.error ? 'При обработке запроса возникла ошибка' : 'Заказ успешно сохранен')}
				</div>
			</form>
		)
	}
}

export default OrderManager