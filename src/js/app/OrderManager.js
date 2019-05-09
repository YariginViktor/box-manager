import { Component } from 'react'
import axios from 'axios'

class OrderManager extends Component {

	constructor(props){
		super(props)
		this.state = {
			wait: true,
			error: false
		}
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(e){
		e.preventDefault()
		axios.post('http://127.0.0.1:8090/orders', {
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

		setTimeout(() => {
			this.setState({
				wait: true,
				error: false
			})
		}, 2000)
	}

	render() {
		return(
			<form onSubmit={this.onSubmit} className="bm-OrderManager">
				<h1>{ this.state.wait ? 'Новая заявка' :
					this.state.error ? 'При создании ошибки возникла ошибка' : 'Заявка успешно создана'
				}</h1>
				<div><span>Название заказа</span><input type="text" name="title" placeholder="" /></div>
				<div><span>Имя заказчика</span><input type="text" name="User" placeholder="" /></div>
				<div><span>Телефон заказчика</span><input type="text" name="phone" placeholder="8 (999) 999 99 99" /></div>
				<div><span>Когда нужно</span><input type="date" name="date" placeholder="" /></div>
				<button>Создать заявку</button>
			</form>
		)
	}
}

export default OrderManager