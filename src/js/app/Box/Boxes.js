import { Component } from 'react'
import BoxesList from './BoxesList'
import AddItem from '../AddItem'
import axios from 'axios'
import settings from '../../fw/settings'

class Boxes extends Component {

	constructor(props){
		super(props)

		this.state = {
			boxes: [],
			store: this.props.store,
			loading: true
		}

		this.updateBoxes = this.updateBoxes.bind(this)
		this.removeBox = this.removeBox.bind(this)
		this.editBox = this.editBox.bind(this)
		this.openBoxManager = this.openBoxManager.bind(this)

	}

	componentDidMount(){
		this.updateBoxes()
	}

	updateBoxes(){
		axios.get(settings.server.URL + '/boxes')
		.then((response) =>
		    this.setState({
		    	boxes: response.data,
		    	loading: false
		    })
		)
		.catch((error) =>
		    console.log(error)
		)
	}

	removeBox(e){
		axios.delete(settings.server.URL + '/boxes/_id', { params: { id: e.target.id } })
		.then(response =>
			this.updateBoxes()
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

	openBoxManager(){
		this.state.store.dispatch({
			type: 'CHANGE_VIEW',
			view: 'BoxManager'
		})
	}

	render(){
		return(
			<div className="bm-list-root">
				<h1>{ this.state.loading ? '' : (this.state.boxes.length ? 'Список наборов' : 'Нет наборов') }</h1>
				<BoxesList list={this.state.boxes} removeBox={this.removeBox} editBox={this.editBox} />
				<AddItem openForm={this.openBoxManager}/>
			</div>
		)
	}

}

export default Boxes