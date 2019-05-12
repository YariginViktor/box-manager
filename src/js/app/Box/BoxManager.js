import { Component } from 'react'
import axios from 'axios'
import settings from '../../fw/settings'

class BoxManager extends Component {

	constructor(props){
		super(props)
		this.state = {
			wait: true,
			error: false,
			edit: this.props.store.getState().edit || false,
			id: this.props.store.getState().id || false,
			store: this.props.store,
			box: false
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.getBox = this.getBox.bind(this)
	}

	componentDidMount(){
		if(this.state.edit) {
			this.getBox()
		}
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
			axios.put(settings.server.URL + '/boxes/save', { 
				id: this.state.id,
				ico: 'https://techcrunch.com/wp-content/uploads/2018/01/gettyimages-890897004.jpg?w=730&crop=1',
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

	render(){
		return(
			<form onSubmit={this.onSubmit} className="bm-form">
				<h1>{ this.state.edit ? 'Редактирование набора' : 'Новый набор'}</h1>
				<div><span>Название набора</span><input type="text" name="title" placeholder="" defaultValue={this.state.edit ? this.state.box.title : '' }/></div>
				<div><span>Описание набора</span><input type="text" name="descr" placeholder="" defaultValue={this.state.edit ? this.state.box.descr : '' }/></div>
				<div><span>Цена</span><input type="text" name="price" placeholder="" defaultValue={this.state.edit ? this.state.box.price : '' }/></div>
				<button>
					{this.state.edit ? 'Сохранить' : 'Создать набор'}
				</button>
				<div className="bm-form-status">
					{ this.state.wait ? '' : (this.state.error ? 'При обработке запроса возникла ошибка' : 'Набор успешно сохранен')}
				</div>
			</form>
		)
	}
}

export default BoxManager