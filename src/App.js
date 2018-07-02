import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Routes from './Routes'
import Header from './Header'
import MainPlayer from './MainPlayer'
import AppChild from './AppChild'
import appReducer from './reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk)),
)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppChild />
            </Provider>
        )
    }
}

export default App
