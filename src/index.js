import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import appReducer from './reducers/index'
import thunk from 'redux-thunk'
import AppContainer from './AppContainer'
import Root from './Root'
import configureStore from './store/configureStore'
import './stylesheets/index.css'

const store = configureStore();

ReactDOM.render((
    <Root store={store} />
), document.getElementById('root'),
)
