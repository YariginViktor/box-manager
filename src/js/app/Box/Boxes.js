import { Component } from 'react'
import BoxesList from './BoxesList'
import axios from 'axios'
import settings from '../../fw/settings'

class Boxes extends Component {

	constructor(props){
		super(props)

		this.state = {
			boxes: [],
			store: this.props.store
		}

		this.updateBoxes = this.updateBoxes.bind(this)
		this.removeBox = this.removeBox.bind(this)
		this.editBox = this.editBox.bind(this)


	}

	componentDidMount(){
		this.updateBoxes()
	}

	updateBoxes(){
		axios.get(settings.server.URL + '/boxes')
		.then((response) =>
		    this.setState({
		    	boxes: response.data
		    })
		)
		.catch((error) =>
		    console.log(error)
		)
	}

	removeBox(e){
		axios.delete(settings.server.URL + '/boxes/_id', { params: { id: e.target.id } })
		.then(response =>
			this.updateOrders()
		)
		.catch(error =>
			console.log(error)
		)
	}

	editBox(e){
		this.state.store.dispatch({
			type: 'EDIT_BOX',
			view: 'BoxManager',
			id: e.target.id
		})
	}

	render(){
		return(
			<div className="bm-list-root">
				<h1>{ this.state.boxes.length ? 'Список наборов' : 'Нет наборов' }</h1>
				<BoxesList list={this.state.boxes} removeBox={this.removeBox} editBox={this.editBox} />
			</div>
		)
	}

}

export default Boxes