import { Component } from 'react'

class CreateOrder extends Component {
	render() {
		return(
			<form className="createOrder">
				<h1>Новая заявка</h1>
				<div><span>Название заказа</span><input type="text" name="title" placeholder="" /></div>
				<div><span>Имя заказчика</span><input type="text" name="User" placeholder="" /></div>
				<div><span>Телефон заказчика</span><input type="text" name="phone" placeholder="8 (999) 999 99 99" /></div>
				<div><span>Когда нужно</span><input type="date" name="date" placeholder="" /></div>
				<button>Создать заявку</button>
			</form>
		)
	}
}

export default CreateOrder