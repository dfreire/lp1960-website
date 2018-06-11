import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import App from './App.jsx'
export default App

if (typeof document !== 'undefined') {
	const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
	const render = Comp => {
		renderMethod( <Comp /> , document.getElementById('root'))
	}
	render(App)
}
