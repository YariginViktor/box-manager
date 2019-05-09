import { Component } from 'react'
import interfaces from './views/interfaces'

class MainScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			view: interfaces['Orders']
		}
	}

	componentDidMount(){
		setTimeout(() => {
		    this.setState({
		    	view: interfaces['CreateOrder']
		    })
		}, 2000)
	}

	render() {
		return (
			<div className="bm-main-root" >
				< this.state.view />
			</div>
		)
	}

}

export default MainScreen