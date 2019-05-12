import { Component } from 'react'

class Navigation extends Component {

	constructor(props) {
		super(props)

		this.state = {
			store: this.props.store,
			currentView: this.props.currentView
		}
		this.changeView = this.changeView.bind(this)
		this.navItems  = [
			{name: 'OrderManager', val: <button onClick={this.changeView} value="OrderManager"> Новый заказ </button>},
			{name: 'BoxManager', val: <button onClick={this.changeView} value="BoxManager"> Новый набор </button>},
			{name: 'Orders', val: <button onClick={this.changeView} value="Orders"> Список заказов </button>},
			{name: 'Boxes', val: <button onClick={this.changeView} value="Boxes"> Список наборов </button>}
		]
	}

	componentWillMount(){
		this.state.store.subscribe(() => {
			this.setState({
				currentView: this.state.store.getState().currentView
			})
		})
	}

	changeView(e){
		this.state.store.dispatch({
			type: 'CHANGE_VIEW',
			view: e.currentTarget.value
		})
		this.setState({
			currentView: e.currentTarget.value
		})
	}

	render() {
		return (
			<div className="bm-navigation">
				{this.navItems.map((el) =>{
					if(el.name !== this.state.currentView){return el.val}
				})}
			</div>
		)
	}
}

export default Navigation