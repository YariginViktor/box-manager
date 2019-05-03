import React from 'react'
import { render } from 'react-dom'
import MainScreen from './js/app/mainScreen'

window.React = React

render(
	<MainScreen />,
	document.getElementById('react-container')
)
