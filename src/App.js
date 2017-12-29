import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import Homepage from './Homepage.js'
import Header from './Header.js'
import MainPlayer from './MainPlayer.js'

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
                <div>
                    <Header />
                    <Homepage />
                    <MainPlayer />
                </div>
            </Provider>
        )
    }
}

export default App
