import { Component } from 'react'
import axios from 'axios'
import settings from '../fw/settings'

class OrderManager extends Component {

	constructor(props){
		super(props)
		this.state = {
			wait: true,
			error: false,
			edit: this.props.store.getState().edit || false,
			id: this.props.store.getState().id || false,
			store: this.props.store,
			order: false
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.getOrder = this.getOrder.bind(this)
		this.formateDate = this.formateDate.bind(this)
	}

	componentDidMount(){
		if(this.state.edit) {
			this.getOrder()
		}
	}

	onSubmit(e){
		e.preventDefault()
		if (!this.state.edit) {
			axios.post(settings.server.URL + '/orders', {
				title: e.target[0].value,
				user: e.target[1].value,
				boxes: [202],
				phone: e.target[2].value,
				date: e.target[3].value,
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
				boxes: [202],
				phone: e.target[2].value,
				date: e.target[3].value,
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

	render(){
		return(
			<form onSubmit={this.onSubmit} className="bm-OrderManager">
				<h1>{ this.state.edit ? 'Редактирование заказа' : 'Новый заказ'}</h1>
				<div><span>Название заказа</span><input type="text" name="title" placeholder="" defaultValue={this.state.edit ? this.state.order.title : '' }/></div>
				<div><span>Имя заказчика</span><input type="text" name="User" placeholder="" defaultValue={this.state.edit ? this.state.order.user : '' }/></div>
				<div><span>Телефон заказчика</span><input type="text" name="phone" placeholder="8 (999) 999 99 99" defaultValue={this.state.edit ? this.state.order.phone : '' }/></div>
				<div><span>Когда нужно</span><input type="date" name="date" placeholder="" defaultValue={this.state.edit ? this.state.order.date : '' }/></div>
				<button>
					{this.state.edit ? 'Сохранить' : 'Создать заказ'}
				</button>
				<div className="bm-OrderManager-status">
					{ this.state.wait ? '' : (this.state.error ? 'При обработке запроса возникла ошибка' : 'Заказ успешно сохранен')}
				</div>
			</form>
		)
	}
}

export default OrderManager