import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import Homepage from './Homepage'
import Header from './Header'
import MainPlayer from './MainPlayer'
import Media from './Media'

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
                    <Media />
                </div>
            </Provider>
        )
    }
}

export default App
